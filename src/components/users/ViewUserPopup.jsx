// ViewUserPopup.js
import React from "react";
import { motion } from "framer-motion";

const ViewUserPopup = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative w-96">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-300 hover:text-gray-100"
        >
          ✕
        </button>
        <h3 className="text-xl font-semibold text-gray-100 mb-4">
          Thông tin tài khoản
        </h3>
        <p className="text-gray-300">
          <span className="font-semibold">Tên:</span> {user.username}
        </p>
        <p className="text-gray-300">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p className="text-gray-300">
          <span className="font-semibold">Vai trò:</span> {user.roleName}
        </p>
        <p className="text-gray-300">
          <span className="font-semibold">Trạng thái:</span> {user.isActive ? "Hoạt động" : "Chặn"}
        </p>
        <p className="text-gray-300">
          <span className="font-semibold">Ngày sinh:</span> {user.dateOfBirth ? user.dateOfBirth : <span className="text-gray-500">Không có</span>}
        </p>
        <p className="text-gray-300">
          <span className="font-semibold">Số điện thoại:</span> {user.phoneNumber ? user.phoneNumber : <span className="text-gray-500">Không có</span>}
        </p>
        <p className="text-gray-300">
          <span className="font-semibold">Giới tính:</span> {user.genderId ? user.genderId : <span className="text-gray-500">Không có</span>}
        </p>
      </div>
    </motion.div>
  );
};

export default ViewUserPopup;
