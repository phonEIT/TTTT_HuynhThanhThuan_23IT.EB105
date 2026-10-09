// AdminLayout.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AdminHeader from "../components/shared/AdminHeader";
import AdminFooter from "../components/shared/AdminFooter";
import ChatBotWidget from '../components/shared/ChatBotWidget';
import {
  FaBars,
  FaLaptop,
  FaClipboardCheck,
  FaChartBar,
  FaUsers,
  FaCog,
  FaRobot,
} from "react-icons/fa";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menu = [
    {
      key: "devices",
      label: "Quản lý thiết bị",
      icon: <FaLaptop className="text-indigo-500" />,
      path: "/admin/devices",
    },
    {
      key: "approval",
      label: "Phê duyệt yêu cầu",
      icon: <FaClipboardCheck className="text-yellow-500" />,
      path: "/admin/approval",
    },
    {
      key: "history",
      label: "Lịch sử mượn trả",
      icon: <FaChartBar className="text-green-600" />,
      path: "/admin/history",
    },
    {
      key: "users",
      label: "Quản lý người dùng",
      icon: <FaUsers className="text-pink-500" />,
      path: "/admin/users",
    },
    {
      key: "settings",
      label: "Xử lý báo cáo lỗi",
      icon: <FaCog className="text-gray-500" />,
      path: "/admin/settings",
    },
 
  ];

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-indigo-50 to-blue-100 text-gray-800">
      {/* Sidebar */}
  <aside
    className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-sm transition-all duration-300 z-50 ${
      sidebarOpen ? "w-64" : "w-16"
    }`}
  >
    <div className="flex items-center justify-between p-6">
      {sidebarOpen && (
        <span className="font-bold text-xl text-indigo-600">ADMIN</span>
      )}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="text-indigo-600 text-xl focus:outline-none"
      >
        <FaBars />
      </button>
    </div>

    <div className="flex flex-col mt-4">
      {menu.map((m) => (
        <Link
          key={m.key}
          to={m.path}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg mx-2 my-1 transition-colors duration-200 hover:bg-indigo-50 hover:text-indigo-700 ${
            location.pathname === m.path
              ? "bg-indigo-100 text-indigo-700 font-semibold"
              : ""
          }`}
        >
          {m.icon}
          {sidebarOpen && <span>{m.label}</span>}
        </Link>
      ))}
    </div>
  </aside>

      {/* Main Content */}
     <div
      className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <AdminHeader />
        <main className="flex-1 overflow-y-auto">{children}</main>
        <ChatBotWidget />
        <AdminFooter />
      </div>

    </div>
  );
};

export default AdminLayout;
