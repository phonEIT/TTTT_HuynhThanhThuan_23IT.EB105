import React, { useEffect, useState } from "react";
import TaskService from "../../services/technician/DashboardService";
import { FaHistory } from "react-icons/fa";

const TaskHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await TaskService.getMyTaskHistory();
      setHistory(data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Không thể tải lịch sử nhiệm vụ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // ✅ Làm đẹp badge trạng thái
  const getActionBadge = (action) => {
    const base =
      "inline-flex items-center justify-center text-center min-w-[100px] max-w-[130px] px-3 py-1 rounded-full text-xs font-semibold shadow-sm leading-tight whitespace-normal break-words transition-all duration-200 hover:scale-105";

    switch (action) {
      case "ASSIGNED":
        return (
          <span className={`${base} bg-yellow-100 text-yellow-700`}>
            📝 Đã giao
          </span>
        );
      case "IN_PROGRESS":
        return (
          <span
            className={`${base} bg-blue-100 text-blue-700 flex gap-1 items-center`}
          >
            <span className="animate-spin">⚙️</span> Đang xử lý
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
      case "CANCELED":
        return (
          <span className={`${base} bg-gray-200 text-gray-600`}>
            🚫 Đã hủy
          </span>
        );
      default:
        return (
          <span className={`${base} bg-gray-100 text-gray-700`}>
            {action || "Không xác định"}
          </span>
        );
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-slate-50 to-gray-100 min-h-screen rounded-2xl">
      {loading && (
        <p className="text-center text-gray-600 mt-6 animate-pulse">
          ⏳ Đang tải lịch sử...
        </p>
      )}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {!loading && !error && (
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 mt-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FaHistory className="text-blue-600" /> Lịch sử nhiệm vụ
            </h1>
            <button
              onClick={fetchHistory}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition"
            >
              🔄 Làm mới
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full text-sm text-gray-700 border-collapse">
              <thead className="bg-gray-100 text-gray-700 font-semibold">
                <tr>
                   <th className="px-4 py-3 text-left">📢 Người báo cáo</th>
                  <th className="px-4 py-3 text-left">🖼️ Thiết bị</th>
                  <th className="px-4 py-3 text-left">🧾 Ghi chú</th>
                  <th className="px-4 py-3 text-center">⚙️ Hành động</th>
                  <th className="px-4 py-3 text-left">🕒 Ngày thực hiện</th>
                
                 
                </tr>
              </thead>
              <tbody>
                {history.length > 0 ? (
                  history.map((item, index) => (
                    <tr
                      key={item.id || index}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3">{item.reportedBy || "—"}</td>
                      <td className="px-4 py-3 flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded-xl border"
                        />
                        <span className="font-medium text-gray-800">
                          {item.productName}
                        </span>
                      </td>
                      <td className="px-4 py-3">{item.note || "—"}</td>
                      <td className="px-4 py-3 text-center">
                        {getActionBadge(item.action)}
                      </td>
                      <td className="px-4 py-3">
                        {item.actionDate
                          ? new Date(item.actionDate).toLocaleString("vi-VN")
                          : "—"}
                      </td>
                    
                    
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-6 text-gray-500 italic"
                    >
                      Không có lịch sử nhiệm vụ.
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

export default TaskHistory;
