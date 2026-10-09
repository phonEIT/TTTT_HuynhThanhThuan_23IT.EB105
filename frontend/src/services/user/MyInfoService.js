// src/services/myInfoService.js
import axiosClient from '../config/axiosClient';

const API_URL = '/admin/employee/myinfo'; // baseURL từ axiosClient

export const getMyInfo = async () => {
  try {
    const response = await axiosClient.get(API_URL);

    if (response.data && response.data.code === 1000) {
      return response.data.data; // trả về data của employee
    }

    // Nếu code 1003 hoặc lỗi khác đã được interceptor xử lý
    return null;
  } catch (error) {
    console.error('Lỗi khi tải thông tin cá nhân:', error);
    throw error;
  }
};
