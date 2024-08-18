import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCurrentLetter,
  addLetter,
  editLetter,
} from "../../../service/candidateService";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export default function Letter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [showLetter, setShowLetter] = useState(true); // State for checkbox
  const letter = useSelector((state) => state.letter.currentLetter);
  const isLoading = useSelector((state) => state.letter.isLoading);

  useEffect(() => {
    dispatch(getCurrentLetter()).then((result) => {
      if (result.payload) {
        setContent(result.payload);
      }
    });
  }, [dispatch]);

  const handleSave = () => {
    if (letter) {
      dispatch(editLetter({ content })).then((result) => {
        if (!result.error) {
          setError("");
        } else {
          setError(
            "Có lỗi xảy ra khi cập nhật thư xin việc. Vui lòng thử lại!"
          );
        }
      });
    } else {
      dispatch(addLetter({ content })).then((result) => {
        if (!result.error) {
          setError("");
        } else {
          setError("Có lỗi xảy ra khi thêm thư xin việc. Vui lòng thử lại!");
        }
      });
    }
  };

  const handleCancel = () => {
    setContent(letter ? letter.content : "");
  };

  const handleCheckboxChange = (e) => {
    setShowLetter(e.target.checked);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Thư Xin Việc</h2>
          <p className="text-sm text-gray-600">
            Gửi phần bản thân và lý do vì sao bạn là sự lựa chọn tuyệt vời
          </p>
        </div>
        {showLetter ? (
          <CheckBoxOutlineBlankIcon
            className="text-blue-500 cursor-pointer"
            onClick={() => setShowLetter(false)}
          />
        ) : (
          <CheckBoxIcon
            className="text-red-600 cursor-pointer"
            onClick={() => setShowLetter(true)}
          />
        )}
      </div>
      {showLetter && (
        <div>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 text-sm h-32"
            placeholder="Viết thư xin việc..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {error && (
            <div className="text-red-500 text-sm mt-2">
              <p>{error}</p>
            </div>
          )}
          <div className="mt-4 flex justify-end">
            <button
              className={`${
                isLoading || content === "" ? "bg-gray-600" : "bg-red-600"
              } text-white rounded-lg px-4 py-2 mr-2`}
              onClick={handleSave}
              disabled={isLoading || content === ""}
            >
              {letter ? "Cập Nhật" : "Lưu Lại"}
            </button>
            <button
              className="bg-gray-100 text-gray-600 border border-gray-300 rounded-lg px-4 py-2"
              onClick={handleCancel}
            >
              Hủy Bỏ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
