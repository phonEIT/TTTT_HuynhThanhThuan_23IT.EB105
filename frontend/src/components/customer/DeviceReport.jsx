import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaClock, FaUserAltSlash } from 'react-icons/fa';
import ErrorReportService from '../../services/user/ErrorReportSevice';

const getStatusUI = (status) => {
  switch (status) {
    case 'PENDING':
      return (
        <span className="flex items-center gap-1 text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full text-sm font-medium">
          <FaClock /> Đang chờ
        </span>
      );
    case 'APPROVED':
      return (
        <span className="flex items-center gap-1 text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
          <FaCheckCircle /> Đã duyệt
        </span>
      );
    default:
      return (
        <span className="flex items-center gap-1 text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
          {status || 'Không xác định'}
        </span>
      );
  }
};

const DeviceReport = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await ErrorReportService.getMYErrorReports();
        const data = Array.isArray(res.data) ? res.data : [];

        const mappedData = data.map((item) => ({
          id: item.id,
          description: item.description || 'Không có mô tả',
          errorDate: item.errorDate || '-',
          device: item.device || 'Không xác định',
          image: item.image || null,
          status: item.status || 'PENDING',
          username: item.username || 'Không rõ',
          technician: item.technician || '',
          taskStatus: item.taskStatus || '',
          technicianNote: item.technicianNote || '',
        }));

        setReports(mappedData);
      } catch (error) {
        console.error('❌ Không thể tải báo cáo lỗi:', error.message);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-poppins">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-10">
        ⚠️ Danh sách báo cáo sự cố
      </h2>

      <div className="overflow-x-auto bg-white p-6 rounded-2xl shadow-lg border">
        <table className="w-full table-auto text-sm">
          <thead className="bg-indigo-50 text-indigo-700 font-semibold uppercase text-xs">
            <tr>
              <th className="text-left px-4 py-3">Hình ảnh</th>
              <th className="text-left px-4 py-3">Thiết bị</th>
              <th className="text-left px-4 py-3">Người báo cáo</th>
              <th className="text-left px-4 py-3">Ngày báo lỗi</th>
              <th className="text-left px-4 py-3">Mô tả lỗi</th>
              <th className="text-left px-4 py-3">Trạng thái</th>
              <th className="text-left px-4 py-3">Kỹ thuật viên</th>
              <th className="text-left px-4 py-3">Trạng thái công việc</th>
              <th className="text-left px-4 py-3">Ghi chú kỹ thuật viên</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700">
            {reports.length > 0 ? (
              reports.map((report) => (
                <tr key={report.id} className="hover:bg-indigo-50 transition">
                  {/* 🖼️ Hình ảnh thiết bị */}
                  <td className="px-4 py-3">
                    {report.image ? (
                      <img
                        src={report.image}
                        alt={report.device}
                        className="w-16 h-16 object-cover rounded-lg shadow"
                      />
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>

                  <td className="px-4 py-4 font-medium">{report.device}</td>
                  <td className="px-4 py-4">{report.username}</td>
                  <td className="px-4 py-4">{report.errorDate}</td>
                  <td className="px-4 py-4">{report.description}</td>
                  <td className="px-4 py-4">{getStatusUI(report.status)}</td>

                  {/* 👨‍🔧 Kỹ thuật viên */}
                  <td className="px-4 py-4">
                    {report.technician ? (
                      report.technician
                    ) : (
                      <span className="flex items-center gap-1 text-gray-400">
                        <FaUserAltSlash /> Chưa có
                      </span>
                    )}
                  </td>

                  {/* ⚙️ Trạng thái công việc */}
                  <td className="px-4 py-4">
                    {report.taskStatus ? (
                      <span className="text-blue-600 font-medium">
                        {report.taskStatus}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>

                  {/* 📝 Ghi chú kỹ thuật viên */}
                  <td className="px-4 py-4">
                    {report.technicianNote ? (
                      report.technicianNote
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-6 text-gray-500 italic"
                >
                  Không có báo cáo nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeviceReport;
