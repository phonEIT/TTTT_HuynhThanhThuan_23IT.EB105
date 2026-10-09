// src/services/axiosClient.js
import axios from 'axios';
import { getToken } from '../admin/AuthService';

// Tạo instance
const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/thietbi247/api', // Đổi khi deploy
  withCredentials: true, // Nếu backend dùng cookie/session
});

// 🛠 Interceptor Request: Tự động gắn token
axiosClient.interceptors.request.use(
  (config) => {
    if (!config.noAuth) {   // nếu không có noAuth thì mới gắn token
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// 🛠 Interceptor Response: Bắt lỗi chung
axiosClient.interceptors.response.use(
  (response) => {
    // Backend trả về code 1003 => Chưa đăng nhập
    if (response?.data?.code === 1003) {
      handleLogout();
      return Promise.reject(new Error('Chưa đăng nhập'));
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;

    // // HTTP 401 (Unauthorized) hoặc 403 (Forbidden)
    // if (status === 401 || status === 403) {
    //   handleLogout();
    // }

    return Promise.reject(error);
  }
);

// 🛠 Hàm logout chung
function handleLogout() {
  localStorage.removeItem('accessToken');
  sessionStorage.removeItem('token'); // nếu dùng session
  window.location.href = '/login';
}


export default axiosClient;
