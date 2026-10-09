import React, { useEffect, useState } from "react";
import TaskService from "../../services/technician/DashboardService";
import { FaTools } from "react-icons/fa";

const TaskInProgress = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await TaskService.getMyTaskInProgress();
      setTasks(data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Không thể tải nhiệm vụ đang xử lý.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Làm đẹp trạng thái
  const getStatusBadge = (status) => {
    const base =
      "inline-flex items-center justify-center text-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm transition-all duration-200";
    switch (status) {
      case "IN_PROGRESS":
        return (
          <span className={`${base} bg-blue-100 text-blue-700`}>
            ⚙️ Đang xử lý
          </span>
        );
      case "COMPLETED":
        return (
          <span className={`${base} bg-green-100 text-green-700`}>
            ✅ Hoàn thành
          </span>
        );
      case "FAILED":
        return (
          <span className={`${base} bg-red-100 text-red-700`}>
            ❌ Thất bại
          </span>
        );
      default:
        return (
          <span className={`${base} bg-gray-100 text-gray-600`}>
            {status || "Không xác định"}
          </span>
        );
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-slate-50 to-gray-100 min-h-screen rounded-2xl">
      {loading && (
        <p className="text-center text-gray-600 mt-6 animate-pulse">
          ⏳ Đang tải nhiệm vụ...
        </p>
      )}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {!loading && !error && (
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 mt-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FaTools className="text-blue-600" /> Thiết bị đang sửa
            </h1>
            <button
              onClick={fetchTasks}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition"
            >
              🔄 Làm mới
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full text-sm text-gray-700 border-collapse">
              <thead className="bg-gray-100 text-gray-700 font-semibold">
                <tr>
                  <th className="px-4 py-3 text-left">🖼️ Thiết bị</th>
                  <th className="px-4 py-3 text-left">📅 Ngày giao</th>
                  <th className="px-4 py-3 text-left">📅 Hạn hoàn thành</th>
                  <th className="px-4 py-3 text-left">🧾 Ghi chú</th>
                  <th className="px-4 py-3 text-center">⚙️ Trạng thái</th>
                  <th className="px-4 py-3 text-left">📢 Người báo cáo</th>
                  <th className="px-4 py-3 text-left">👨‍🔧 Người thực hiện</th>
                  <th className="px-4 py-3 text-left">👨‍💼 Người giao</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length > 0 ? (
                  tasks.map((task, index) => (
                    <tr
                      key={task.id || index}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 flex items-center gap-3">
                        <img
                          src={task.image}
                          alt={task.productName}
                          className="w-16 h-16 object-cover rounded-xl border"
                        />
                        <span className="font-medium text-gray-800">
                          {task.productName}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {task.assignedDate
                          ? new Date(task.assignedDate).toLocaleString("vi-VN")
                          : "—"}
                      </td>
                      <td className="px-4 py-3">
                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleString("vi-VN")
                          : "—"}
                      </td>
                      <td className="px-4 py-3">{task.note || "—"}</td>
                      <td className="px-4 py-3 text-center">
                        {getStatusBadge(task.status)}
                      </td>
                      <td className="px-4 py-3">{task.reportedBy || "—"}</td>
                      <td className="px-4 py-3">{task.assignedToName || "—"}</td>
                      <td className="px-4 py-3">{task.assignedByName || "—"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-6 text-gray-500 italic"
                    >
                      Không có thiết bị đang sửa.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskInProgress;
