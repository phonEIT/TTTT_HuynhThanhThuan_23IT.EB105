// src/pages/history/HistoryPage.js
import React, { useEffect, useState } from "react";
import HistoryTable from "../HistoryTable";
import {
  getHistoryList,
  getRequestBorrowHistory,
  getReturnDeviceHistory,
  getErrorReportHistory
} from "../../../services/admin/HistoryService";

const HistoryPage = () => {
  const [histories, setHistories] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // all | request | return

  useEffect(() => {
    const fetchData = async () => {
      let res = [];
      if (activeTab === "all") {
        res = await getHistoryList();
      } else if (activeTab === "request") {
        res = await getRequestBorrowHistory();
      } else if (activeTab === "return") {
        res = await getReturnDeviceHistory();
      } else if (activeTab === "error") {
        res = await getErrorReportHistory();
      }
      console.log("👉 API history trả về:", res);
      setHistories(res || []);
    };
    fetchData();
  }, [activeTab]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 font-poppins">
      <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 mb-10">
        📜 Quản lý lịch sử
      </h2>

      {/* Tabs navigation */}
      <div className="flex justify-center mb-8 space-x-4">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-6 py-2 rounded-2xl font-semibold shadow-md transition-all ${
            activeTab === "all"
              ? "bg-gradient-to-r from-pink-500 to-red-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Tất cả
        </button>
        <button
          onClick={() => setActiveTab("request")}
          className={`px-6 py-2 rounded-2xl font-semibold shadow-md transition-all ${
            activeTab === "request"
              ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Mượn thiết bị
        </button>
        <button
          onClick={() => setActiveTab("return")}
          className={`px-6 py-2 rounded-2xl font-semibold shadow-md transition-all ${
            activeTab === "return"
              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Trả thiết bị
        </button>
          <button
          onClick={() => setActiveTab("error")}
          className={`px-6 py-2 rounded-2xl font-semibold shadow-md transition-all ${
            activeTab === "error"
              ? "bg-gradient-to-r from-red-500 to-yellow-300 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Báo lỗi thiết bị
        </button>   
      </div>

      {/* Hiển thị bảng */}
      <HistoryTable histories={histories} />
    </div>
  );
};

export default HistoryPage;
