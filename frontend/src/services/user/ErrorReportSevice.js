import axiosClient from '../config/axiosClient'; // Dùng axiosClient đã config sẵn

class ErrorReportService {
  constructor() {
    this.API_URL = '/admin/error_report';
    this.API_MY_ERROR = '/admin/error_report/myInfo';
    this.API_HANDLE = '/admin/error_report/hanlde';
    this.API_TASK = '/admin/task'; // ✅ thêm endpoint cho task
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

  async createErrorReport(data) {
    try {
      const response = await axiosClient.post(this.API_URL, data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'tạo báo cáo lỗi');
    }
  }

  async getErrorReports() {
    try {
      const response = await axiosClient.get(this.API_URL);
      return response.data;
    } catch (error) {
      this.handleError(error, 'lấy danh sách báo cáo lỗi');
    }
  }

  async getMYErrorReports() {
    try {
      const response = await axiosClient.get(this.API_MY_ERROR);
      return response.data;
    } catch (error) {
      this.handleError(error, 'lấy danh sách báo cáo lỗi');
    }
  }

  // 🆕 Hàm lấy danh sách báo cáo APPROVED
  async getApprovedErrorReports() {
    try {
      const response = await axiosClient.get(this.API_HANDLE);
      return response.data;
    } catch (error) {
      this.handleError(error, 'lấy danh sách báo cáo lỗi đã phê duyệt');
    }
  }

  // 🆕 Hàm mới: Giao task cho kỹ thuật viên
  async assignTechnicianTask(data) {
    try {
      const response = await axiosClient.post(this.API_TASK, data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'giao task cho kỹ thuật viên');
    }
  }
}

export default new ErrorReportService();
