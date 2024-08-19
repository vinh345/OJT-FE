import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCVs,
  deleteCV,
  editCVName,
  updateCVStatus,
} from "../../service/candidateService";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ConfirmDeletingCV from "./ConfirmDeletingCV";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CVList() {
  const dispatch = useDispatch();
  const { cvList, isLoading, error, hasActiveCV } = useSelector(
    (state) => state.cv
  );
  const [editingId, setEditingId] = useState(null);
  const [newFileName, setNewFileName] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(null);

  useEffect(() => {
    dispatch(fetchAllCVs());
  }, [dispatch]);

  const handleEdit = (id, currentName) => {
    setEditingId(id);
    setNewFileName(currentName);
  };

  const handleSave = () => {
    if (editingId !== null && newFileName !== "") {
      dispatch(editCVName({ id: editingId, name: newFileName }))
        .unwrap()
        .then(() => {
          setEditingId(null);
        })
        .catch((error) => {
          console.error("Failed to save the CV name:", error.message);
        });
    }
  };

  const handleDelete = (cvId) => {
    setShowDeleteConfirmation(cvId);
  };

  const handleConfirmDelete = () => {
    if (showDeleteConfirmation) {
      dispatch(deleteCV(showDeleteConfirmation));
      setShowDeleteConfirmation(null);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteConfirmation(null);
  };

  const handleToggleStatus = (id) => {
    dispatch(updateCVStatus(id))
      .unwrap()
      .then(() => {
        console.log("CV status toggled successfully!");
      })
      .catch((error) => {
        console.error("Failed to toggle CV status:", error.message);
      });
  };

  if (isLoading) {
    return <p className="text-center mt-4">Loading CVs...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-4 text-red-600">
        Error loading CVs: {error}
      </p>
    );
  }

  return (
    <div className="bg-gray-100 font-sans leading-normal tracking-normal min-h-screen">
      <main className="container mx-auto py-8">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold">Danh sách CV hiện tại</h2>
          <li className="p-4 bg-gray-200 rounded-lg flex justify-between items-start">
            <div className="flex-1">
              <div className="flex-1">
                <div className="flex flex-col items-start gap-2">
                  <p className="font-semibold">CV mặc định</p>
                  <p className="text-sm text-gray-600">
                    CV được lập dựa trên các thông tin cá nhân của bạn!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Link to={`default`}>
                <RemoveRedEyeIcon />
              </Link>

              <button
                disabled={!hasActiveCV}
                onClick={() => handleToggleStatus(0)}
              >
                {hasActiveCV ? (
                  <ToggleOffIcon className="text-gray-600" />
                ) : (
                  <ToggleOnIcon className="text-blue-600" />
                )}
              </button>
            </div>
          </li>
          <ul className="mt-4 space-y-4">
            {cvList.map((cv) => (
              <div key={cv.id}>
                <li className="p-4 bg-gray-200 rounded-lg flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex-1">
                      {editingId === cv.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Tên CV không được để trống!"
                            value={newFileName}
                            onChange={(e) => setNewFileName(e.target.value)}
                            className="border rounded p-2"
                          />
                          <SaveIcon
                            className="hover:cursor-pointer text-blue-600"
                            onClick={handleSave}
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 leading-none">
                          <p className="font-semibold">
                            {cv.fileName}
                            <EditIcon
                              className="hover:cursor-pointer text-red-500"
                              onClick={() => handleEdit(cv.id, cv.fileName)}
                            />
                          </p>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Ngày tải lên:{" "}
                      {new Date(cv.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Link to={`${cv.id}`}>
                      <RemoveRedEyeIcon />
                    </Link>

                    <DeleteIcon
                      onClick={() => handleDelete(cv.id)}
                      className="text-red-600 hover:cursor-pointer"
                    />
                    <button onClick={() => handleToggleStatus(cv.id)}>
                      {cv.status ? (
                        <ToggleOnIcon className="text-blue-600 text-lg" />
                      ) : (
                        <ToggleOffIcon className="text-gray-600" />
                      )}
                    </button>
                  </div>
                </li>
                {showDeleteConfirmation === cv.id && (
                  <div className="mt-2">
                    <ConfirmDeletingCV
                      onConfirm={handleConfirmDelete}
                      onCancel={handleCloseDeleteModal}
                    />
                  </div>
                )}
              </div>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
