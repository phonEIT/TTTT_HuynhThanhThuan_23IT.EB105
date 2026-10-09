// src/services/AuthService.js
import axiosClient from '../config/axiosClient';
import { jwtDecode } from 'jwt-decode';

const API_URL = '/auth'; // baseURL đã set sẵn trong axiosClient

// Đăng nhập
export const loginApi = async (username, password) => {
  const response = await axiosClient.post(`${API_URL}/token`, {
    username,
    password,
  });
  return response.data;
};

// Đăng xuất
export const logoutApi = async () => {
  const token = getToken();
  const response = await axiosClient.post(
    `${API_URL}/logout`,
    { token },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Lưu token vào sessionStorage
export const setToken = (token) => {
  sessionStorage.setItem('accessToken', token);
};

// Lấy token từ sessionStorage
export const getToken = () => {
  return sessionStorage.getItem('accessToken');
};

// Lấy scope từ JWT token
export const getScopeFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.scope ? decoded.scope.split(' ') : [];
  } catch (error) {
    return [];
  }
};
