// src/services/UserService.js
import axiosClient from "../config/axiosClient";

class UserService {
  constructor() {
    this.API_URL = "/admin/employee"; // axiosClient đã set baseURL
  }

  handleError(err, action) {
    if (err.response) {
      const message = err.response.data?.message || "Có lỗi xảy ra";
      console.error(`❌ Lỗi ${action}:`, message);
      throw new Error(message);
    } else if (err.request) {
      console.error(`❌ Lỗi ${action}: Không thể kết nối tới server`);
      throw new Error("Không thể kết nối tới server");
    } else {
      console.error(`❌ Lỗi ${action}:`, err.message);
      throw new Error(err.message);
    }
  }

  async getUsersApi() {
    try {
      const res = await axiosClient.get(this.API_URL);
      return res.data;
    } catch (err) {
      this.handleError(err, "lấy danh sách người dùng");
    }
  }

  async addUserApi(userForm) {
    try {
      const res = await axiosClient.post(this.API_URL, userForm);
      return res.data;
    } catch (err) {
      this.handleError(err, "thêm người dùng");
    }
  }

  async getUserById(userId) {
    try {
      const res = await axiosClient.get(`${this.API_URL}/${userId}`);
      return res.data;
    } catch (err) {
      this.handleError(err, `lấy người dùng ID ${userId}`);
    }
  }

  async updateUser(userId, userForm) {
    try {
      const res = await axiosClient.put(`${this.API_URL}/${userId}`, userForm);
      return res.data;
    } catch (err) {
      this.handleError(err, `cập nhật người dùng ID ${userId}`);
    }
  }

  async deleteUserApi(userId) {
    try {
      const res = await axiosClient.delete(`${this.API_URL}/${userId}`);
      return res.data;
    } catch (err) {
      this.handleError(err, `xóa người dùng ID ${userId}`);
    }
  }
  async getTechniciansApi() {
    try {
      const res = await axiosClient.get(`${this.API_URL}/technician`);
      return res.data;
    } catch (err) {
      this.handleError(err, "lấy danh sách kỹ thuật viên");
    }
  }
}

export default new UserService();
