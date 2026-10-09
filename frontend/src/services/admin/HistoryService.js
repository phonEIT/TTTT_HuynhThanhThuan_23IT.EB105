// src/services/HistoryService.js
import axiosClient from '../config/axiosClient';

const API_URL = '/admin/history';

export const getHistoryList = async () => {
  try {
    const res = await axiosClient.get(API_URL);
    return res.data.data || [];
  } catch (error) {
    console.error('Lỗi khi lấy lịch sử:', error);
    return [];
  }
};

export const getRequestBorrowHistory = async () => {
  try {
    const res = await axiosClient.get(`${API_URL}/request`);
    return res.data.data || [];
  } catch (error) {
    console.error('Lỗi khi lấy lịch sử mượn thiết bị:', error);
    return [];
  }
};

export const getReturnDeviceHistory = async () => {
  try {
    const res = await axiosClient.get(`${API_URL}/return`);
    return res.data.data || [];
  } catch (error) {
    console.error('Lỗi khi lấy lịch sử trả thiết bị:', error);
    return [];
  }
};

export const getErrorReportHistory = async () => {
  try {
    const res = await axiosClient.get(`${API_URL}/error`);
    return res.data.data || [];
  } catch (error) {
    console.error('Lỗi khi lấy lịch sử báo lỗi thiết bị:', error);
    return [];
  }
}
