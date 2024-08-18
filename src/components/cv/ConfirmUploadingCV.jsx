import React from 'react';

const ConfirmUploadingCV = ({ filePreview, onConfirm, onCancel }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <p className="text-gray-600 text-sm mb-4">
        Bạn có chắc muốn tải lên CV này không?
      </p>
      <div className="flex justify-end">
        <button
          onClick={onConfirm}
          className="bg-red-600 text-white rounded-lg px-4 py-2 mr-2"
        >
          Tải lên
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-100 text-gray-600 border border-gray-300 rounded-lg px-4 py-2"
        >
          Hủy
        </button>
      </div>
    </div>
  );
};

export default ConfirmUploadingCV;
