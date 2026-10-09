import React, { useEffect, useState } from "react";
import TaskService from "../../services/technician/DashboardService";
import { FaClipboardList } from "react-icons/fa";

const AdminTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updateData, setUpdateData] = useState({
    status: "",
    note: "",
  });

  // 🧩 Lấy danh sách nhiệm vụ
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await TaskService.getMyTasks();
      setTasks(data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Không thể tải danh sách nhiệm vụ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🎨 Badge trạng thái
const getStatusBadge = (status) => {
  const base =
    "inline-flex items-center justify-center text-center min-w-[90px] max-w-[120px] px-3 py-1 rounded-full text-xs font-semibold shadow-sm leading-tight whitespace-normal break-words";

  switch (status) {
    case "ASSIGNED":
      return (
        <span className={`${base} bg-yellow-100 text-yellow-700`}>
          📝 Đã giao
        </span>
      );
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
    case "CANCELED":
      return (
        <span className={`${base} bg-gray-200 text-gray-600`}>
          🚫 Đã hủy
        </span>
      );
    default:
      return (
        <span className={`${base} bg-gray-100 text-gray-700`}>
          {status || "Không xác định"}
        </span>
      );
  }
};


  // 🧭 Mở modal cập nhật
  const openUpdateModal = (task) => {
    setSelectedTask(task);
    setUpdateData({
      status: task.status || "ASSIGNED",
      note: task.note || "",
    });
    setShowModal(true);
  };

  // 🛠️ Gửi cập nhật API
  const handleUpdateTask = async () => {
    if (!updateData.status) {
      alert("Vui lòng chọn trạng thái!");
      return;
    }

    try {
      await TaskService.updateTask({
        id: selectedTask.id,
        status: updateData.status,
        note: updateData.note,
      });
      alert("✅ Cập nhật nhiệm vụ thành công!");
      setShowModal(false);
      fetchTasks();
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-slate-50 to-gray-100 min-h-screen rounded-2xl">
      {loading && <p className="text-center text-gray-500">⏳ Đang tải...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && (
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FaClipboardList className="text-blue-600" /> Danh sách nhiệm vụ
            </h1>
            <button
              onClick={fetchTasks}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition"
            >
              🔄 Làm mới
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full text-sm text-gray-700 border">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">🖼 Ảnh</th>
              <th className="px-4 py-3 text-left">📦 Thiết bị</th>
              <th className="px-4 py-3 text-left">🧾 Ghi chú</th>
              <th className="px-4 py-3 text-left">🕒 Ngày giao</th>
       
              <th className="px-4 py-3 text-left">👤 Người báo cáo</th>
             
              <th className="px-4 py-3 text-center">⚙️ Trạng thái</th>
              <th className="px-4 py-3 text-center">🛠️ Hành động</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr
                  key={task.id || index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* 🖼 Hình ảnh */}
                  <td className="px-4 py-3">
                    {task.image ? (
                      <img
                        src={task.image}
                        alt={task.productName || "Thiết bị"}
                        className="w-14 h-14 rounded-lg object-cover border shadow-sm"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                        Không có ảnh
                      </div>
                    )}
                  </td>

                  {/* 📦 Tên sản phẩm */}
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {task.productName || "Không có tên"}
                  </td>

                  {/* 🧾 Ghi chú */}
                  <td className="px-4 py-3 max-w-xs">{task.note}</td>

                  {/* 🕒 Ngày giao */}
                  <td className="px-4 py-3">
                    {new Date(task.assignedDate).toLocaleString("vi-VN")}
                  </td>

                

                  {/* 👤 Người báo cáo */}
                  <td className="px-4 py-3">{task.reportedBy}</td>

               

                  {/* ⚙️ Trạng thái */}
                  <td className="px-4 py-3 text-center">
                    {getStatusBadge(task.status)}
                  </td>

                  {/* 🛠️ Nút cập nhật */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => openUpdateModal(task)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs shadow"
                    >
                      ✏️ Cập nhật
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  Không có nhiệm vụ nào.
                </td>
              </tr>
            )}
          </tbody>

            </table>
          </div>
        </div>
      )}

      {/* 🪟 Modal cập nhật */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              🛠️ Cập nhật nhiệm vụ
            </h2>

            <label className="block text-sm font-medium text-gray-600 mb-2">
              Trạng thái
            </label>
            <select
              value={updateData.status}
              onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="ASSIGNED">Đã giao</option>
              <option value="IN_PROGRESS">Đang xử lý</option>
              <option value="COMPLETED">Hoàn thành</option>
              <option value="FAILED">Thất bại</option>
              <option value="CANCELED">Đã hủy</option>
            </select>

            <label className="block text-sm font-medium text-gray-600 mb-2">
              Ghi chú
            </label>
            <textarea
              value={updateData.note}
              onChange={(e) => setUpdateData({ ...updateData, note: e.target.value })}
              rows="3"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
              placeholder="Nhập ghi chú..."
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
              >
                Hủy
              </button>
              <button
                onClick={handleUpdateTask}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                💾 Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTasks;
