import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadCV } from "../../../service/candidateService";
import ConfirmUploadingCV from "../../../components/cv/ConfirmUploadingCV";
import CVList from "../../../components/cv/CVList";
import Letter from "../Letter/Letter";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import CV from "../../../assets/CV.png";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Cookies } from "react-cookie";
import CircularProgress from "@mui/material/CircularProgress"; // Importing CircularProgress for loading spinner

const CVManagement = () => {
  const cookie = new Cookies();
  const name = cookie.get("name");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isPDF, setIsPDF] = useState(false);
  const [isDoc, setIsDoc] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const dispatch = useDispatch();

  const validTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && validTypes.includes(file.type)) {
      setSelectedFile(file);
      setIsPDF(file.type === "application/pdf");
      setIsDoc(
        file.type === "application/msword" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );

      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setError("");
      setShowConfirmation(true);
    } else {
      setError("Only PDF, DOC, and DOCX files are allowed.");
      setShowConfirmation(false);
    }
  };

  useEffect(() => {
    if (filePreview) {
      return () => {
        URL.revokeObjectURL(filePreview);
      };
    }
  }, [filePreview]);

  const checkPasswordProtection = async (file) => {
    // Implement your logic to check if the file is password-protected
    // Return true if password-protected, else false
    return false;
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Vui lòng chọn tệp tin để tải lên!");
      return;
    }

    if (selectedFile.size > 3 * 1024 * 1024) {
      setError("Tập tin vượt quá kích cỡ cho phép (3MB).");
      return;
    }

    const isPasswordProtected = await checkPasswordProtection(selectedFile);
    if (isPasswordProtected) {
      setError("Tập tin này có chứa mật khẩu bảo vệ. Vui lòng chọn tệp khác.");
      return;
    }

    try {
      setLoading(true); // Start loading
      setError("");

      await dispatch(uploadCV(selectedFile));

      // Reload the page after successful upload
      window.location.reload();
    } catch (error) {
      setError("Có lỗi xảy ra trong quá trình tải lên. Vui lòng thử lại.");
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleCloseUploadModal = () => {
    setShowConfirmation(false);
    setSelectedFile(null);
    setFilePreview("");
    setError("");
  };

  const docs = [{ uri: filePreview }]; // Prepare for DocViewer

  return (
    <div className="bg-gray-100 font-sans leading-normal tracking-normal min-h-screen relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <CircularProgress size={60} />
            <p className="mt-4 text-white text-lg">Đang tải lên...</p>
          </div>
        </div>
      )}
      <main className="container mx-auto px-96 py-8">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Chào, {name}</h2>
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Tải CV của bạn lên để được sử dụng xuyên suốt quá trình tìm việc.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex gap-4 border border-gray-200 p-4 w-full">
              <img src={CV} className="w-16" alt="CV Icon" />
              <div className="flex flex-col w-full">
                <h1 className="text-lg font-medium mb-2">CV của bạn</h1>

                {/* Hidden File Input */}
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex items-center space-x-2">
                  <FileUploadIcon className="text-red-600" />
                  {/* Custom Upload Button */}
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <span className="text-red-500">Tải lên</span>
                    <span className="ml-2 text-gray-500">
                      (Sử dụng tệp .doc, .docx, .pdf, không chứa mật khẩu bảo vệ
                      và dưới 3MB)
                    </span>
                  </label>
                </div>
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </div>
            </div>
          </div>

          {selectedFile && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Tệp đã chọn: {selectedFile.name}
              </p>
              {/* Display PDF Preview */}
              {isPDF && (
                <div className="mt-4 border border-gray-300 p-4 rounded-md">
                  <iframe
                    src={filePreview}
                    className="w-full h-48 border border-gray-300 rounded-lg"
                    title="File preview"
                  />
                </div>
              )}
              {isDoc && (
                <p className="mt-4 border border-gray-300 p-4 rounded-md text-red-600">
                  Định dạng này không được hỗ trợ xem trước!
                </p>
              )}
            </div>
          )}
        </div>
        {showConfirmation && (
          <ConfirmUploadingCV
            filePreview={filePreview}
            onConfirm={handleUpload}
            onCancel={handleCloseUploadModal}
          />
        )}

        <CVList />

        <Letter />
      </main>
    </div>
  );
};

export default CVManagement;
