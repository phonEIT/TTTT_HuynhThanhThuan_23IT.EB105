import React, { useState, useEffect } from "react";
import DeviceHistory from "../DeviceHistory";
import historyService from "../../../services/user/HistoryService";
import errorReportService from "../../../services/user/ErrorReportSevice";
import returnDeviceService from "../../../services/user/ReturnDeviceService";

const HistoryPage = () => {
  const [histories, setHistories] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reason, setReason] = useState("");

  const fetchData = async () => {
    let res = [];
    if (activeTab === "all") {
      res = await historyService.getMyHistory();
    } else if (activeTab === "request") {
      res = await historyService.getMyRequestHistory();
    } else if (activeTab === "return") {
      res = await historyService.getMyReturnHistory();
    } else if (activeTab === "error") {
      res = await historyService.getMyErrorReportHistory();
    }
    setHistories(res || []);
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleReturnDevice = async (item) => {
    try {
      await returnDeviceService.returnDevice(item.approval.requestBorrowId);
      alert(`Đã trả thiết bị: ${item.approval.requestBorrowId}`);
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Lỗi khi trả thiết bị!");
    }
  };

  const openReportForm = (item) => {
    setSelectedItem(item);
    setShowReportForm(true);
  };

  const handleSubmitReport = async () => {
    try {
      await errorReportService.createErrorReport({
        requestBorrow_id: selectedItem.approval.requestBorrowId,
        description: reason,
      });
      alert(`Đã báo lỗi cho thiết bị: ${selectedItem.device?.productName}`);
      setShowReportForm(false);
      setReason("");
      setSelectedItem(null);
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Lỗi khi báo cáo!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 font-poppins">
      <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 mb-10">
        📜 Quản lý lịch sử
      </h2>

      {/* Tabs */}
      <div className="flex justify-center mb-8 space-x-4">
        {["all", "request", "return", "error"].map((tab) => {
          const labels = {
            all: "Tất cả",
            request: "Mượn thiết bị",
            return: "Trả thiết bị",
            error: "Báo lỗi thiết bị",
          };
          const colors = {
            all: "from-pink-500 to-red-500",
            request: "from-blue-500 to-green-500",
            return: "from-green-500 to-emerald-500",
            error: "from-red-500 to-yellow-300",
          };
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-2xl font-semibold shadow-md transition-all duration-300 ${
                activeTab === tab
                  ? `bg-gradient-to-r ${colors[tab]} text-white`
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {labels[tab]}
            </button>
          );
        })}
      </div>

      {/* Danh sách lịch sử */}
      <DeviceHistory
        histories={histories}
        onReturnDevice={handleReturnDevice}
        onReportError={openReportForm}
      />

     {/* Form báo lỗi */}
      {/* Form báo lỗi */}
      {showReportForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50">
          <div className="bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-800 p-6 rounded-2xl shadow-2xl w-[440px] text-white animate-fadeIn border border-indigo-500/20">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-indigo-300">
                🚨 Báo lỗi thiết bị
              </h2>
              <button
                onClick={() => setShowReportForm(false)}
                className="text-gray-400 hover:text-indigo-300 transition"
              >
                ✕
              </button>
            </div>

            {/* Thông tin sản phẩm */}
            <div className="flex items-center gap-4 p-3 border border-indigo-500/20 rounded-lg bg-white/5 mb-5">
              {selectedItem?.device?.image ? (
                <img
                  src={selectedItem.device.image}
                  alt={selectedItem.device.productName || 'Hình ảnh sản phẩm'}
                  className="w-20 h-20 object-cover rounded-lg border border-indigo-500/20 shadow"
                />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center bg-indigo-500/10 text-indigo-300 rounded-lg">
                  📷
                </div>
              )}
              <div>
                <p className="text-sm text-gray-400">Sản phẩm</p>
                <p className="text-base font-medium text-white">
                  {selectedItem?.device?.productName || 'Không rõ'}
                </p>
              </div>
            </div>

            {/* Textarea mô tả */}
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Mô tả chi tiết lỗi
            </label>
            <textarea
              className="w-full border border-indigo-500/20 bg-white/10 text-white placeholder-white/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 p-3 rounded-lg mb-5 text-sm outline-none transition"
              rows="4"
              placeholder="Nhập mô tả lỗi gặp phải..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />

            {/* Nút hành động */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowReportForm(false)}
                className="px-4 py-2 rounded-lg bg-white/10 text-gray-200 hover:bg-white/20 hover:text-white font-medium transition"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmitReport}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-medium shadow-lg hover:opacity-90 transition"
              >
                Gửi báo cáo
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default HistoryPage;
