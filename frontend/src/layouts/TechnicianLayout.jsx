import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AdminHeader from "../components/shared/AdminHeader";
import AdminFooter from "../components/shared/AdminFooter";
import ChatBotWidget from "../components/shared/ChatBotWidget";
import { FaBars, FaClipboardList, FaHistory, FaTools, FaUser } from "react-icons/fa";

const TechnicianLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menu = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <FaClipboardList className="text-indigo-500" />,
      path: "/technician",
    },
    {
      key: "history",
      label: "Lịch sử công việc",
      icon: <FaHistory className="text-yellow-500" />,
      path: "/technician/tasks-history",
    },
    {
      key: "inrepair",
      label: "Đang sửa chữa",
      icon: <FaTools className="text-green-600" />,
      path: "/technician/in-progress",
    },
    {
      key: "profile",
      label: "Hồ sơ cá nhân",
      icon: <FaUser className="text-pink-500" />,
      path: "/technician/my-info",
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
            <span className="font-bold text-xl text-indigo-600">TECHNICIAN</span>
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

export default TechnicianLayout;
