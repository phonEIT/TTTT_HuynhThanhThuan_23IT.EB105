import React, { useState, useEffect } from 'react';
import { FaUserCheck, FaUserTimes } from 'react-icons/fa';
import { getApprovalsByType, updateApprovalStatus } from '../../services/admin/approvalService';

const AdminApproval = () => {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeType, setActiveType] = useState('ALL'); // ALL, REQUEST_BORROW, RETURN_DEVICE, ERROR_REPORT

  const fetchApprovals = async (type = 'ALL') => {
    try {
      setLoading(true);
      setError(null);
      const res = await getApprovalsByType(type === 'ALL' ? undefined : type);
      setApprovals(Array.isArray(res.data) ? res.data : res);
    } catch (err) {
      console.error('Lỗi khi tải danh sách:', err);
      setError('Không thể tải danh sách yêu cầu.');
      setApprovals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovals(activeType);
  }, [activeType]);

  const handleAction = async (id, status) => {
    try {
      await updateApprovalStatus(id, status);
      alert(`✅ Yêu cầu #${id} đã được ${status === 'APPROVED' ? 'duyệt' : 'từ chối'}`);
      fetchApprovals(activeType);
    } catch (err) {
      console.error('Lỗi cập nhật:', err);
      alert('❌ Có lỗi xảy ra khi cập nhật');
    }
  };

  const renderStatusBadge = (status) => {
    const s = status?.toUpperCase();
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-700',
      APPROVED: 'bg-blue-100 text-blue-700',
      REJECTED: 'bg-orange-100 text-orange-700',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[s] || 'bg-gray-100 text-gray-700'}`}>
        {s || '—'}
      </span>
    );
  };

  const filterButtons = [
    { type: 'ALL', label: 'Tất cả', gradient: 'from-pink-500 to-red-500' },
    { type: 'REQUEST_BORROW', label: 'Mượn thiết bị', gradient: 'from-blue-500 to-green-500' },
    { type: 'RETURN_DEVICE', label: 'Trả thiết bị', gradient: 'from-green-500 to-emerald-500' },
    { type: 'ERROR_REPORT', label: 'Báo lỗi', gradient: 'from-red-500 to-yellow-400' },
  ];

  return (
    <div className="p-6 bg-gradient-to-br via-slate-50 to-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">📝 Phê Duyệt Yêu Cầu</h1>

      {/* Nút lọc */}
      <div className="flex justify-center gap-4 mb-6">
        {filterButtons.map((btn) => (
          <button
            key={btn.type}
            onClick={() => setActiveType(btn.type)}
            className={`px-6 py-2 rounded-2xl font-semibold shadow-md transition-all ${
              activeType === btn.type
                ? `bg-gradient-to-r ${btn.gradient} text-white`
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {loading && <p className="text-center text-gray-600 text-lg">⏳ Đang tải dữ liệu...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-5 overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 font-semibold">
              <tr>
                <th className="px-4 py-3">Người dùng</th>
                <th className="px-4 py-3">Hình ảnh</th>
                <th className="px-4 py-3">Thiết bị</th>
                <th className="px-4 py-3">Loại yêu cầu</th>
                <th className="px-4 py-3">Ngày yêu cầu</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {approvals.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    Không có yêu cầu nào.
                  </td>
                </tr>
              ) : (
                approvals.map((req) => {
                  const isPending = req.status?.toUpperCase() === 'PENDING';
                  return (
                    <tr key={req.id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-4 py-3">{req.user?.userName || '—'}</td>
                      <td className="px-4 py-3">
                        {req.device?.image ? (
                          <img
                            src={req.device.image}
                            alt={req.device.productName}
                            className="w-16 h-16 rounded object-cover border"
                          />
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="px-4 py-3">{req.device?.productName || '—'}</td>
                      <td className="px-4 py-3">{req.type || '—'}</td>
                      <td className="px-4 py-3">{req.requestDate ? new Date(req.requestDate).toLocaleString() : '—'}</td>
                      <td className="px-4 py-3">{renderStatusBadge(req.status)}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleAction(req.id, 'APPROVED')}
                            disabled={!isPending}
                            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FaUserCheck /> Duyệt
                          </button>
                          <button
                            onClick={() => handleAction(req.id, 'REJECTED')}
                            disabled={!isPending}
                            className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FaUserTimes /> Từ chối
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminApproval;
