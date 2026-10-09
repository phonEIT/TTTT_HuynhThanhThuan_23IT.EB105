// src/services/approvalService.js
import axiosClient from '../config/axiosClient';

const API_URL = '/admin/approval';

//  Lấy danh sách phê duyệt
export const getApprovals = async () => {
  const res = await axiosClient.get(API_URL);
  return res.data;
};

// ✏️ Cập nhật trạng thái phê duyệt
export const updateApprovalStatus = async (id, status) => {
  const payload = { id, status };
  const res = await axiosClient.put(API_URL, payload);
  return res.data;
};

// 📥 Lấy danh sách phê duyệt theo type
export const getApprovalsByType = async (type) => {
  if (!type || type === 'ALL') {
    return getApprovals(); // nếu type không có, trả tất cả
  }
  const res = await axiosClient.get(`${API_URL}/${type}`);
  return res.data;
};
