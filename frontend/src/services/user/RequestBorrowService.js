// src/services/requestBorrowService.js
import axiosClient from '../config/axiosClient'; // Dùng axiosClient đã config sẵn

export const getMyRequestBorrows = async () => {
  try {
    const res = await axiosClient.get('/admin/request_borrow/myInfo');
    return res.data?.data || [];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách request borrow:', error);
    return [];
  }
};

// ➕ Thêm thiết bị mới
export const addRequestBorrowApi = async (requestData) => {

  try {
    const res = await axiosClient.post('/admin/request_borrow', requestData);
    return res.data;
  } catch (error) {
    console.error('Lỗi khi thêm request borrow:', error);
    throw error; 
  }
}


export const borrowedDevicesNotReturnedByUser = async () => {
  try {
    const res = await axiosClient.get('/admin/request_borrow/not-returned', {
      headers: { 'Content-Type': 'application/json' } // nếu backend require
    });
    console.log(res.data);
    return res.data?.data || [];
  } catch (err) {
    console.error('Lỗi khi lấy danh sách thiết bị mượn chưa trả:', err.response?.data || err);
    return [];
  }
};

