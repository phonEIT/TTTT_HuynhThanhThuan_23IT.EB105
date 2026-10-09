// src/pages/Admin/AdminDevices.jsx
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import {
  getDevicesApi,
  addDeviceApi,
  updateDeviceApi,
  deleteDeviceApi,
} from '../../services/admin/DeviceService';
import { getCategoriesApi } from '../../services/admin/CategoryService';
import { uploadImageApi } from '../../services/config/UploadService';

const AdminDevices = () => {
  const [devices, setDevices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [deviceForm, setDeviceForm] = useState({
    id: '',
    productName: '',
    description: '',
    quantity: 1,
    status: 'Sẵn sàng',
    image: '',
    categoryId: '',
  });

  // Lấy danh sách thiết bị
  const fetchDevices = async () => {
    setLoading(true);
    try {
      const data = await getDevicesApi();
      setDevices(data || []);
      setError(null);
    } catch (err) {
      console.error('❌ Lỗi khi tải thiết bị:', err);
      setError('Không thể tải danh sách thiết bị.');
    } finally {
      setLoading(false);
    }
  };

  // Lấy danh mục
  const fetchCategories = async () => {
    try {
      const data = await getCategoriesApi();
      setCategories(data || []);
    } catch (err) {
      console.error('❌ Lỗi khi tải danh mục:', err);
    }
  };

  useEffect(() => {
    fetchDevices();
    fetchCategories();
  }, []);

  // Mở modal thêm/sửa thiết bị
  const openModal = (device = null) => {
    if (device) {
      setEditingDevice(device);
      setDeviceForm({
        id: device.id || '',
        productName: device.productName || '',
        description: device.description || '',
        quantity: device.quantity ?? 1,
        status: ['Sẵn sàng','Bảo trì'].includes(device.status)
          ? device.status
          : 'Sẵn sàng', // chỉ chấp nhận status hợp lệ
        image: device.image || '',
        categoryId: device.category?.id || '', // ID thực sự của danh mục
      });
    } else {
      setEditingDevice(null);
      setDeviceForm({
        id: '',
        productName: '',
        description: '',
        quantity: 1,
        status: 'Sẵn sàng',
        image: '',
        categoryId: '',
      });
    }

    setShowModal(true);
  };

  // Lưu thiết bị (thêm hoặc cập nhật)
  const handleSaveDevice = async () => {
    try {
      // Payload gửi backend
      const payload = {
        id: editingDevice?.id || undefined,
        productName: deviceForm.productName,
        description: deviceForm.description,
        quantity: deviceForm.quantity,
        status: deviceForm.status, // giữ nguyên status từ form
        image: deviceForm.image,
        category: deviceForm.categoryId ? { id: deviceForm.categoryId } : null,
      };

      console.log('📤 Payload gửi API:', payload);

      if (editingDevice) {
        await updateDeviceApi(payload);
      } else {
        await addDeviceApi(payload);
      }

      await fetchDevices();
      setShowModal(false);
      setError(null);
    } catch (err) {
      console.error('❌ Lỗi khi lưu thiết bị:', err);
      setError('Không thể lưu thiết bị.');
    }
  };

  // Upload ảnh
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadImageApi(file);
      setDeviceForm((prev) => ({ ...prev, image: imageUrl }));
    } catch (err) {
      console.error('❌ Lỗi upload ảnh:', err);
      alert('Không thể upload ảnh!');
    } finally {
      setUploading(false);
    }
  };

  // Xóa thiết bị
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xoá thiết bị này?')) return;
    try {
      await deleteDeviceApi(id);
      setDevices((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error('❌ Lỗi khi xoá thiết bị:', err);
      setError('Không thể xoá thiết bị.');
    }
  };

  return (
    <div className='p-6 bg-gradient-to-br from-white via-slate-50 to-gray-100 min-h-screen'>
      {loading && <p>⏳ Đang tải...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      {!loading && !error && (
        <div className='max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6'>
          <div className='flex justify-between items-center mb-6'>
            <h1 className='text-2xl font-bold text-gray-800'>
              📦 Danh sách thiết bị
            </h1>
            <button
              onClick={() => openModal()}
              className='flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition'
            >
              <FaPlus /> Thêm thiết bị
            </button>
          </div>

          <div className='overflow-x-auto rounded-lg'>
            <table className='min-w-full text-sm text-gray-700'>
              <thead className='bg-gray-100 text-gray-700 font-semibold'>
                <tr>
                  <th className='px-4 py-3 text-left'>Tên thiết bị</th>
                  <th className='px-4 py-3 text-left'>Mô tả</th>
                  <th className='px-4 py-3 text-left'>Số lượng</th>
                  <th className='px-4 py-3 text-left'>Trạng thái</th>
                  <th className='px-4 py-3 text-left'>Danh mục</th>
                  <th className='px-4 py-3 text-left'>Hình ảnh</th>
                  <th className='px-4 py-3 text-center'>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {devices.length > 0 ? (
                  devices.map((device) => (
                    <tr
                      key={device.id}
                      className='border-t hover:bg-gray-50 transition'
                    >
                      <td className='px-4 py-3'>{device.productName}</td>
                      <td className='px-4 py-3'>{device.description}</td>
                      <td className='px-4 py-3'>{device.quantity}</td>
                      <td className='px-4 py-3'>{device.status}</td>
                      <td className='px-4 py-3'>
                        {device.category?.name || device.categoryId || ''}
                      </td>
                      <td className='px-4 py-3'>
                        {device.image && (
                          <img
                            src={device.image}
                            alt={device.productName}
                            className='w-16 h-16 object-cover rounded'
                          />
                        )}
                      </td>
                      <td className='px-4 py-3 text-center'>
                        <button
                          onClick={() => openModal(device)}
                          className='text-blue-600 hover:text-blue-800 mx-2'
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(device.id)}
                          className='text-red-600 hover:text-red-800 mx-2'
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='7' className='text-center py-4'>
                      Không có thiết bị nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal thêm/sửa */}
      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 w-full max-w-lg'>
            <h2 className='text-xl font-bold mb-4'>
              {editingDevice ? '✏️ Sửa thiết bị' : '➕ Thêm thiết bị'}
            </h2>
            <div className='space-y-3'>
              <input
                type='text'
                placeholder='Tên thiết bị'
                value={deviceForm.productName}
                onChange={(e) =>
                  setDeviceForm({ ...deviceForm, productName: e.target.value })
                }
                className='w-full border rounded p-2'
              />
              <textarea
                placeholder='Mô tả'
                value={deviceForm.description}
                onChange={(e) =>
                  setDeviceForm({ ...deviceForm, description: e.target.value })
                }
                className='w-full border rounded p-2'
              />
              <input
                type='number'
                placeholder='Số lượng'
                value={deviceForm.quantity}
                onChange={(e) =>
                  setDeviceForm({
                    ...deviceForm,
                    quantity: parseInt(e.target.value) || 1,
                  })
                }
                className='w-full border rounded p-2'
              />
              <select
                value={deviceForm.status}
                onChange={(e) =>
                  setDeviceForm({ ...deviceForm, status: e.target.value })
                }
                className='w-full border rounded p-2'
              >
                <option value='Sẵn sàng'>Sẵn sàng</option>
                <option value='Bảo trì'>Bảo trì</option>
              </select>
              <select
                value={deviceForm.categoryId}
                onChange={(e) =>
                  setDeviceForm({ ...deviceForm, categoryId: e.target.value })
                }
                className='w-full border rounded p-2'
              >
                <option value=''>Chọn danh mục</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
                className='w-full border rounded p-2'
              />
              {uploading && (
                <p className='text-gray-500'>⏳ Đang upload ảnh...</p>
              )}
              {deviceForm.image && (
                <img
                  src={deviceForm.image}
                  alt='preview'
                  className='w-24 h-24 object-cover rounded mt-2'
                />
              )}
              <div className='flex justify-end gap-2 mt-4'>
                <button
                  onClick={() => setShowModal(false)}
                  className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
                >
                  Hủy
                </button>
                <button
                  onClick={handleSaveDevice}
                  disabled={uploading}
                  className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                >
                  {editingDevice ? 'Cập nhật' : 'Lưu'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDevices;
