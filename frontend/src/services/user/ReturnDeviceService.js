import axiosClient from '../config/axiosClient'; // Dùng axiosClient đã config sẵn

class ReturnDeviceService {
  constructor() {
    this.API_URL = '/admin/return_device'; // Đường dẫn API cho trả thiết bị
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

  async returnDevice(requestBorrow_id) {
    try {
      const res = await axiosClient.post(this.API_URL, {
        requestBorrow_id: requestBorrow_id, // gửi JSON object
      });
      return res.data;
    } catch (err) {
      this.handleError(err, 'trả thiết bị');
    }
  }


}

export default new ReturnDeviceService();
