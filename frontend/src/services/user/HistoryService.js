// src/services/user/historyService.js
import axiosClient from '../config/axiosClient'; // Dùng axiosClient đã config sẵn

class HistoryService {
  constructor() {
    this.API_URL = '/admin/history'; // Đường dẫn API cho lịch sử mượn thiết bị
  }

  handleError(err, action) {
    if (err.response) {
      const message = err.response.data?.message || 'Có lỗi xảy ra';
      console.error(`❌ Lỗi ${action}:`, message);
      throw new Error(message);
    } else if (err.request) {
      console.error(`❌ Lỗi ${action}: Không thể kết nối tới server`);
      throw new Error('Không thể kết nối tới server');
    } else {
      console.error(`❌ Lỗi ${action}:`, err.message);
      throw new Error(err.message);
    }
  }

  async getMyHistory() {
    try {
      const res = await axiosClient.get(this.API_URL + '/myInfo');
       return res.data.data || [];
    } catch (err) {
      this.handleError(err, 'lấy lịch sử mượn thiết bị');
    }
  }
  async getMyRequestHistory() {
    try {
      const res = await axiosClient.get(this.API_URL + '/my-request-borrow');
      return res.data.data || [];
    } catch (err) {
      this.handleError(err, 'lấy lịch sử yêu cầu mượn thiết bị');
    }
}
  async getMyReturnHistory() {
    try {
      const res = await axiosClient.get(this.API_URL + '/my-return-device');
      return res.data.data || [];
    } catch (err) {
      this.handleError(err, 'lấy lịch sử trả thiết bị');
    }
}
  async getMyErrorReportHistory() {
    try {
      const res = await axiosClient.get(this.API_URL + '/my-error-report');
      return res.data.data || [];
    } catch (err) {
      this.handleError(err, 'lấy lịch sử báo lỗi thiết bị');
    }
}
}

export default new HistoryService();
