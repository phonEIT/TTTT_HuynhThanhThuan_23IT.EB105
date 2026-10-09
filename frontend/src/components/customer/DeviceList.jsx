import React, { useEffect, useState } from 'react';
import { Monitor, Info } from 'lucide-react';
import { FaCheckCircle, FaTools, FaTimesCircle, FaExclamationTriangle, FaPaperPlane } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { getDevicesApi } from '../../services/admin/DeviceService';
import { addRequestBorrowApi } from '../../services/user/RequestBorrowService';

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [requested, setRequested] = useState(false);
  const [borrowReason, setBorrowReason] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(devices.length / itemsPerPage);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const data = await getDevicesApi();
      setDevices(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Không thể tải danh sách thiết bị');
    } finally {
      setLoading(false);
    }
  };

  const getStatusUI = (status) => {
    const map = {
      'Sẵn sàng': ['text-green-700 bg-green-100', <FaCheckCircle />],
      'Bảo trì': ['text-yellow-700 bg-yellow-100', <FaTools />],
      Hỏng: ['text-red-700 bg-red-100', <FaTimesCircle />],
      'Đang mượn': ['text-blue-700 bg-blue-100', <FaExclamationTriangle />],
    };
    const [classes, icon] = map[status] || ['text-gray-600 bg-gray-200', null];
    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${classes}`}>
        {icon} {status || 'Không rõ'}
      </span>
    );
  };

  const handleRequest = () => {
    if (!borrowReason || !dueDate) {
      alert('⚠️ Vui lòng nhập đầy đủ thông tin lý do và hạn trả.');
      return;
    }

    const requestData = {
      device_id: selectedDevice.id,
      deviceName: selectedDevice.name || selectedDevice.productName,
      borrowReason,
      dueDate,
    };
    addRequestBorrowApi(requestData)
      .then(() => {
        console.log('Yêu cầu mượn thiết bị thành công:', requestData);
      })
      .catch((err) => {
        console.error('Lỗi khi gửi yêu cầu mượn:', err);
        alert('❌ Đã xảy ra lỗi khi gửi yêu cầu mượn. Vui lòng thử lại sau.');
      });
    setSelectedDevice(null);
    setBorrowReason("");
    setDueDate("");
    setRequested(true);

    alert(` Yêu cầu mượn thiết bị đã được gửi!`);
  };

  const displayedDevices = devices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-blue-50 py-10 px-6 font-poppins">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-10 flex items-center gap-3">
          📦 Danh sách Thiết bị
        </h2>

        {loading && <p className="text-gray-600 text-lg">⏳ Đang tải dữ liệu...</p>}
        {error && <p className="text-red-600 font-medium">{error}</p>}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedDevices.map((device) => (
            <div
              key={device.id}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all border border-gray-200 p-5 flex flex-col relative group"
            >
              <div className="rounded-xl overflow-hidden bg-gray-50 border mb-4">
                <img
                  src={device.image}
                  alt={device.name}
                  onError={(e) => (e.target.src = '/fallback-image.jpg')}
                  className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-indigo-600" />
                  {device.name || device.productName}
                </h3>
                <p className="text-sm text-gray-600 mb-3 flex items-start gap-2 line-clamp-2">
                  <Info className="w-4 h-4 mt-0.5 text-gray-400" />
                  {device.description}
                </p>
                <div className="mt-auto">{getStatusUI(device.status)}</div>

                <button
                  onClick={() => {
                    setSelectedDevice(device);
                    setRequested(false);
                    setBorrowReason("");
                    setDueDate("17:00:00 20/08/2025");
                  }}
                  className="absolute top-4 right-4 bg-gradient-to-tr from-indigo-100 to-indigo-300 text-indigo-800 font-semibold px-3 py-1.5 rounded-full text-xs shadow-sm hover:from-indigo-200 hover:to-indigo-400 hover:text-indigo-900 transition-all"
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-3">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-100 text-indigo-700'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modal chi tiết thiết bị */}
      {selectedDevice && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl mx-4 p-8 relative animate-fadeIn">
            <button
              onClick={() => setSelectedDevice(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <MdClose size={26} />
            </button>
            <h3 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
              📋 Chi tiết Thiết bị
            </h3>

            <div className="md:flex gap-6">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <img
                  src={selectedDevice.image}
                  alt={selectedDevice.name}
                  onError={(e) => (e.target.src = '/fallback-image.jpg')}
                  className="w-full h-64 object-contain rounded-xl border bg-gray-50"
                />
              </div>

              <div className="md:w-1/2 space-y-4 text-sm text-gray-700">
                <div>
                  <span className="font-semibold text-gray-800">Tên:</span>{' '}
                  {selectedDevice.name || selectedDevice.productName}
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Mô tả:</span>{' '}
                  {selectedDevice.description}
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Số lượng:</span>{' '}
                  {selectedDevice.quantity}
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Danh mục:</span>{' '}
                  {selectedDevice.categoryId}
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Trạng thái:</span>{' '}
                  {getStatusUI(selectedDevice.status)}
                </div>

                {selectedDevice.status === 'Sẵn sàng' && !requested && (
                  <>
                    <div className="pt-2">
                      <label className="block text-gray-700 font-semibold mb-1">
                        Lý do mượn
                      </label>
                      <input
                        type="text"
                        value={borrowReason}
                        onChange={(e) => setBorrowReason(e.target.value)}
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    </div>
                    <div className="pt-2">
                      <label className="block text-gray-700 font-semibold mb-1">
                        Hạn trả
                      </label>
                      <input
                        type="datetime-local"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    </div>
                    <div className="pt-4 text-right">
                      <button
                        onClick={handleRequest}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition shadow"
                      >
                        <FaPaperPlane /> Gửi yêu cầu mượn
                      </button>
                    </div>
                  </>
                )}

                {requested && (
                  <p className="text-green-600 font-semibold pt-3">
                    ✅ Yêu cầu mượn đã được gửi thành công!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceList;
 