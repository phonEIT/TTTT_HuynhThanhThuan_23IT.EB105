// src/services/DeviceService.js
import axiosClient from '../config/axiosClient';

// 📦 Lấy danh sách thiết bị
export const getDevicesApi = async () => {
  const res = await axiosClient.get("/admin/device");
  return res.data.data || [];
};

// ➕ Thêm thiết bị mới
export const addDeviceApi = async (deviceForm) => {
  const payload = {
    ...deviceForm,
    category_id: deviceForm.categoryId,
  };
  const res = await axiosClient.post("/admin/device", payload);
  return res.data;
};

// ✏️ Cập nhật thiết bị
export const updateDeviceApi = async (deviceForm) => {
  const payload = {
    ...deviceForm,
    id: deviceForm.id,
    categoryId: deviceForm.categoryId,
  };
  const res = await axiosClient.put("/admin/device", payload);
  return res.data;
};

// 🗑 Xóa thiết bị
export const deleteDeviceApi = async (id) => {
  const res = await axiosClient.delete(`/admin/device/${id}`);
  return res.data;
};

export const searchDevicesApi = async (keyword) => {
  try {
    const res = await axiosClient.get(`/admin/device/${encodeURIComponent(keyword)}`,
      { noAuth: true });
    return res.data.data || [];
  } catch (error) {
    console.error('Search devices error:', error);
    return [];
  }
};