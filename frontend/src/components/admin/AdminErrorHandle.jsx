import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import ErrorReportService from "../../services/user/ErrorReportSevice";
import UserService from "../../services/admin/UserService";

const AdminSettings = () => {
  const [reports, setReports] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Lấy danh sách báo cáo & kỹ thuật viên
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resReports, resTechs] = await Promise.all([
          ErrorReportService.getApprovedErrorReports(),
          UserService.getTechniciansApi(),
        ]);

        if (resReports?.code === 1000) setReports(resReports.data || []);
        if (resTechs?.code === 1000) setTechnicians(resTechs.data || []);
      } catch (err) {
        setError(err.message || "Lỗi khi tải dữ liệu từ server");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🆕 Giao task cho kỹ thuật viên (gọi API)
  const handleAssign = async (report) => {
    const tech = technicians.find((t) => t.id === report.selectedTech);
    if (!tech) return alert("⚠️ Chưa chọn kỹ thuật viên!");

    const confirmAssign = window.confirm(
      `Bạn có chắc muốn giao task này cho kỹ thuật viên "${tech.userName}" không?`
    );
    if (!confirmAssign) return;

    try {
      const payload = {
        errorReportId: report.id,
        technician: report.selectedTech,
        dueDate: new Date().toISOString().slice(0, 16), // mặc định thời gian hiện tại
        note: "",
      };

      const res = await ErrorReportService.assignTechnicianTask(payload);
      if (res?.code === 1000) {
        alert("✅ Giao task thành công!");
        setReports((prev) =>
          prev.map((r) =>
            r.id === report.id
              ? { ...r, taskStatus: "Đang xử lý", technician: tech.userName }
              : r
          )
        );
      } else {
        alert("❌ Giao task thất bại: " + res?.message);
      }
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  if (loading)
    return <div className="text-center text-indigo-600 mt-10">⏳ Đang tải dữ liệu...</div>;
  if (error)
    return <div className="text-center text-red-600 mt-10">❌ {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-poppins">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-10">
        ⚙️ Danh sách báo cáo sự cố (APPROVED)
      </h2>

      <div className="overflow-x-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <table className="w-full table-auto text-sm">
          <thead className="bg-indigo-50 text-indigo-700 font-semibold uppercase text-xs">
            <tr>
              <th className="text-left px-4 py-3">Thiết bị</th>
              <th className="text-left px-4 py-3">Người báo cáo</th>
              <th className="text-left px-4 py-3">Mô tả</th>
              <th className="text-left px-4 py-3">Ngày báo lỗi</th>
              <th className="text-left px-4 py-3 text-center">Trạng thái task</th>
              <th className="text-center px-4 py-3">Kỹ thuật viên</th>
              <th className="text-center px-4 py-3">Ghi chú kỹ thuật viên</th>
              <th className="text-center px-4 py-3">Hành động</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-gray-700">
            {reports.length > 0 ? (
              reports.map((report) => (
                <tr
                  key={report.id}
                  className="hover:bg-indigo-50 transition-all duration-150"
                >
                  {/* Thiết bị */}
                  <td className="px-4 py-4 font-medium flex items-center gap-3">
                    <img
                      src={report.image || "/no-image.png"}
                      alt="device"
                      className="w-10 h-10 rounded-lg object-cover border border-gray-200 shadow-sm"
                    />
                    <span>{report.device}</span>
                  </td>

                  {/* Người báo cáo */}
                  <td className="px-4 py-4">{report.username}</td>

                  {/* Mô tả */}
                  <td className="px-4 py-4 text-gray-600">{report.description}</td>

                  {/* Ngày báo lỗi */}
                  <td className="px-4 py-4 text-gray-600">{report.errorDate}</td>

                  {/* Trạng thái */}
                  <td className="px-4 py-4 text-center font-semibold text-indigo-600">
                    {report.taskStatus || "Chưa có"}
                  </td>

                  {/* Kỹ thuật viên */}
                  <td className="px-4 py-4 text-center">
                    {!report.technician ? (
                      <select
                        className="w-48 text-center border border-indigo-300 bg-white text-gray-700 font-medium px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        onChange={(e) =>
                          setReports((prev) =>
                            prev.map((r) =>
                              r.id === report.id
                                ? { ...r, selectedTech: e.target.value }
                                : r
                            )
                          )
                        }
                        value={report.selectedTech || ""}
                      >
                        <option value="">Chọn kỹ thuật viên</option>
                        {technicians.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.userName}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-indigo-700 font-semibold">
                        {report.technician}
                      </span>
                    )}
                  </td>

                  {/* Ghi chú kỹ thuật viên */}
                  <td className="px-4 py-4 text-gray-600 italic text-center">
                    {report.technicianNote || "-"}
                  </td>

                  {/* Hành động */}
                  <td className="px-4 py-4 text-center">
                    {!report.technician ? (
                      <button
                        className={`${
                          !report.selectedTech
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-indigo-500 hover:bg-indigo-600"
                        } text-white font-medium px-5 py-2 rounded-lg shadow-sm transition-all duration-200`}
                        disabled={!report.selectedTech}
                        onClick={() => handleAssign(report)}
                      >
                        <FaCheckCircle className="inline-block mr-1 mb-0.5" />
                        Giao task
                      </button>
                    ) : (
                      <button
                        className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg shadow-sm transition"
                        onClick={() =>
                          alert(report.technicianNote || "Chưa có ghi chú kỹ thuật viên")
                        }
                      >
                        <FaClock className="text-yellow-500" />
                        Xem ghi chú
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500 italic">
                  Không có báo cáo nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSettings;
