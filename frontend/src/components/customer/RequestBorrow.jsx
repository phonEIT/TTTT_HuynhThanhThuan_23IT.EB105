// pages/RequestBorrowPage.jsx
import React, { useEffect, useState } from 'react';
import { getMyRequestBorrows } from '../../services/user/RequestBorrowService';
import { format } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
import { FaClock, FaCheckCircle, FaTimesCircle, FaArrowDown } from 'react-icons/fa';

  export default function RequestBorrowPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyRequestBorrows();
        setRequests(data || []);
      } catch (err) {
        console.error('Lỗi khi lấy yêu cầu mượn:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa có';
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: viLocale });
  };

  const getStatusBadge = (status) => {
    const baseClass = 'px-3 py-1 text-xs font-semibold rounded-full shadow-sm';
    switch (status) {
      case 'PENDING':
        return <span className={`${baseClass} bg-yellow-100 text-yellow-700`}><FaClock className="inline mr-1" /> Đang chờ</span>;
      case 'APPROVED':
        return <span className={`${baseClass} bg-green-100 text-green-700`}><FaCheckCircle className="inline mr-1" /> Đã duyệt</span>;
      case 'REJECTED':
        return <span className={`${baseClass} bg-red-100 text-red-700`}><FaTimesCircle className="inline mr-1" /> Từ chối</span>;
      default:
        return <span className={`${baseClass} bg-gray-100 text-gray-700`}>{status || 'Khác'}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 font-poppins">
      <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500 mb-10">
        📋 Danh sách yêu cầu mượn thiết bị
      </h1>

      {loading ? (
        <p className="text-gray-500 text-center">Đang tải dữ liệu...</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-2xl bg-white">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
              <tr>
                <th className="px-5 py-3">#</th>
               
                <th className="px-5 py-3">Thiết bị</th>
                <th className="px-5 py-3">Lý do</th>
                <th className="px-5 py-3">Ngày mượn</th>
                <th className="px-5 py-3">Ngày trả</th>
          
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {requests.length > 0 ? (
                requests.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-5 py-4">{index + 1}</td>


                 {/* Thiết bị */}
                  <td className="px-5 py-4">
                    {item.device ? (
                      <div className="flex items-center space-x-2">
                        {item.device.image && (
                          <img
                            src={item.device.image.startsWith('http') ? item.device.image : `/images/${item.device.image}`}
                            alt={item.device.productName}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        )}
                        <span>{item.device.productName} ({item.device.quantity})</span>
                      </div>
                    ) : (
                      <span>Không có thiết bị</span>
                    )}
                  </td>

                    {/* Lý do */}
                    <td className="px-5 py-4">{item.borrowReason || 'Không có'}</td>

                    {/* Ngày mượn */}
                    <td className="px-5 py-4 text-gray-600">{formatDate(item.borrowDate)}</td>

                    {/* Ngày trả */}
                    <td className="px-5 py-4 text-gray-600">{item.dueDate || 'Chưa có'}</td>

            
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    Không có yêu cầu nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
