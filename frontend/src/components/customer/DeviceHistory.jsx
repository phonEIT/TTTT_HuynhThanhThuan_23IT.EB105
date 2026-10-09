import { format } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowDown,
  FaArrowUp,
  FaQuestionCircle,
  FaExclamationTriangle,
  FaUndo,
  FaBug,
  FaMinusCircle,
} from 'react-icons/fa';

const formatDate = (dateString) => {
  if (!dateString) return '---';
  return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: viLocale });
};

  

const getStatusBadge = (status) => {
  const baseClass =
    'inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full shadow-sm whitespace-nowrap';
  switch (status) {
    case 'PENDING':
      return (
        <span className={`${baseClass} bg-yellow-100 text-yellow-700`}>
          <FaClock /> Đang chờ
        </span>
      );
    case 'APPROVED':
      return (
        <span className={`${baseClass} bg-green-100 text-green-700`}>
          <FaCheckCircle /> Đã duyệt
        </span>
      );
    case 'REJECTED':
      return (
        <span className={`${baseClass} bg-red-100 text-red-700`}>
          <FaTimesCircle /> Từ chối
        </span>
      );
    default:
      return null;
  }
};

const getRequestTypeBadge = (type) => {
  const baseClass =
    'inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full shadow-sm whitespace-nowrap';
  switch (type) {
    case 'REQUEST_BORROW':
      return (
        <span className={`${baseClass} bg-blue-100 text-blue-700`}>
          <FaArrowDown /> Mượn
        </span>
      );
    case 'RETURN_DEVICE':
      return (
        <span className={`${baseClass} bg-purple-100 text-purple-700`}>
          <FaArrowUp /> Trả
        </span>
      );
    case 'ERROR_REPORT':
      return (
        <span className={`${baseClass} bg-yellow-300 text-red-700`}>
          <FaExclamationTriangle /> Báo cáo lỗi
        </span>
      );
    default:
      return (
        <span className={`${baseClass} bg-gray-100 text-gray-700`}>
          <FaQuestionCircle /> Khác
        </span>
      );
  }
};

const DeviceHistory = ({ histories = [], onReturnDevice, onReportError }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-100 text-sm font-semibold text-gray-600">
          <tr>
            <th className="px-5 py-3">Hình ảnh</th>
            <th className="px-5 py-3">Thiết bị</th>
            <th className="px-5 py-3">Loại yêu cầu</th>
            <th className="px-5 py-3">Ngày mượn</th>
            <th className="px-5 py-3">Ngày trả</th>
            <th className="px-5 py-3">Ngày báo lỗi</th>
            <th className="px-5 py-3">Trạng thái</th>
            <th className="px-5 py-3">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {histories.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50 transition">
              {/* Hình ảnh */}
              <td className="px-5 py-4">
                {item.device?.image && (
                  <img
                    src={item.device.image}
                    alt={item.device.productName}
                    className="w-12 h-12 rounded-lg object-cover shadow"
                  />
                )}
              </td>

              {/* Tên thiết bị */}
              <td className="px-5 py-4 text-gray-700 font-medium">
                {item.device?.productName || 'Không có thiết bị'}
              </td>

              {/* Loại yêu cầu */}
              <td className="px-5 py-4">{getRequestTypeBadge(item.approval?.type)}</td>

              {/* Ngày mượn */}
              <td className="px-5 py-4 text-gray-600">{formatDate(item.borrowDate)}</td>

              {/* Ngày trả */}
              <td className="px-5 py-4 text-gray-600">{formatDate(item.returnDate)}</td>


              {/* Ngày báo lỗi */}
              <td className="px-5 py-4 text-gray-600">{formatDate(item.errorDate)}</td>
 
              {/* Trạng thái */}
              <td className="px-5 py-4">{getStatusBadge(item.approval?.status)}</td>

              {/* Hành động */}
              <td className="px-5 py-4">
                {item.approval?.type === 'REQUEST_BORROW' &&
                item.approval?.status === 'APPROVED' &&
                (!item.returnDate || item.returnDate === '') &&
                (!item.errorDate || item.errorDate === '')  ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => onReturnDevice?.(item)}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full shadow hover:bg-blue-600 transition"
                    >
                      <FaUndo /> Trả thiết bị
                    </button>
                    <button
                      onClick={() => onReportError?.(item)}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full shadow hover:bg-red-600 transition"
                    >
                      <FaBug /> Báo cáo lỗi
                    </button>
                  </div>
                ) : (
                  <span className="flex items-center justify-center text-gray-400 text-sm">
                    <FaMinusCircle className="mr-1" /> Không 
                  </span>
                )}
              </td>
            </tr>
          ))}

          {histories.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-500">
                Không có lịch sử nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


export default DeviceHistory;
