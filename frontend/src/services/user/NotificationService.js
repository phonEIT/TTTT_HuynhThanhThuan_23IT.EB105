// src/services/notificationService.js
import axiosClient from '../config/axiosClient';

const API_URL = '/admin/notification/myinfo'; // dùng baseURL từ axiosClient
const API_URL_UNREAD = '/admin/notification/unread-count';

export const getMyNotifications = async () => {
  try {
    const response = await axiosClient.get(API_URL);

    if (response.data && response.data.code === 1000) {
      return response.data.data;
    }

    // Xử lý nếu code 1003 đã được logout trong interceptor
    return [];
  } catch (error) {
    console.error('Lỗi khi tải thông báo:', error);
    throw error;
  }
};

export const getUnreadNotificationCount = async () => {
  try {
    const response = await axiosClient.get(API_URL_UNREAD);

    if (response.data && response.data.code === 1000) {
      // response.data.data = { count: 1 }
      return response.data.data.count || 0;
    }

    return 0;
  } catch (error) {
    console.error('Lỗi khi lấy số thông báo chưa đọc:', error);
    return 0;
  }
};