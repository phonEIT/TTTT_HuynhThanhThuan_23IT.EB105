import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

const AdminDevices = () => {
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const [devices, setDevices] = useState([
    { id: 1, name: 'Laptop Dell XPS 13', status: 'Sẵn sàng', quantity: 10 },
    { id: 2, name: 'Máy in HP', status: 'Bảo trì', quantity: 3 },
  ]);

  const [deviceForm, setDeviceForm] = useState({
    name: '',
    status: 'Sẵn sàng',
    quantity: 1,
    image: '',
    description: '',
  });

  const [categoryForm, setCategoryForm] = useState({
    category_name: '',
    description: '',
    status: true,
  });

  const handleAddDevice = (e) => {
    e.preventDefault();
    setDevices([
      ...devices,
      {
        id: devices.length + 1,
        ...deviceForm,
      },
    ]);
    setShowDeviceModal(false);
    setDeviceForm({ name: '', status: 'Sẵn sàng', quantity: 1, image: '', description: '' });
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    console.log('Danh mục mới:', categoryForm);
    setShowCategoryModal(false);
    setCategoryForm({ category_name: '', description: '', status: true });
  };

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <h2 className='text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 mb-6'>
        📦 Quản lý thiết bị
      </h2>

      <div className='flex gap-4 mb-6'>
        <button
          className='bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2 rounded-lg shadow hover:brightness-110 transition'
          onClick={() => setShowDeviceModal(true)}
        >
          <FaPlus className='inline mr-2' /> Thêm thiết bị
        </button>
        <button
          className='bg-gradient-to-r from-green-500 to-teal-500 text-white px-5 py-2 rounded-lg shadow hover:brightness-110 transition'
          onClick={() => setShowCategoryModal(true)}
        >
          <FaPlus className='inline mr-2' /> Thêm danh mục
        </button>
      </div>

      <table className='w-full bg-white shadow-lg rounded overflow-hidden'>
        <thead className='bg-indigo-600 text-white'>
          <tr>
            <th className='p-4 text-left'>Tên thiết bị</th>
            <th className='p-4'>Trạng thái</th>
            <th className='p-4'>Số lượng</th>
            <th className='p-4'>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((d) => (
            <tr key={d.id} className='border-t hover:bg-indigo-50'>
              <td className='p-4'>{d.name}</td>
              <td className='p-4 text-center'>{d.status}</td>
              <td className='p-4 text-center'>{d.quantity}</td>
              <td className='p-4 flex justify-center gap-3'>
                <button className='text-blue-600 hover:text-blue-800'><FaEdit /></button>
                <button className='text-red-600 hover:text-red-800'><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal thêm thiết bị */}
      {showDeviceModal && (
        <Modal onClose={() => setShowDeviceModal(false)} title='🛠️ Thêm thiết bị mới'>
          <form onSubmit={handleAddDevice} className='space-y-4'>
            <input
              type='text'
              placeholder='Tên thiết bị'
              className='w-full border p-2 rounded'
              value={deviceForm.name}
              onChange={(e) => setDeviceForm({ ...deviceForm, name: e.target.value })}
              required
            />
            <select
              className='w-full border p-2 rounded'
              value={deviceForm.status}
              onChange={(e) => setDeviceForm({ ...deviceForm, status: e.target.value })}
            >
              <option>Sẵn sàng</option>
              <option>Đang sử dụng</option>
              <option>Bảo trì</option>
            </select>
            <input
              type='number'
              placeholder='Số lượng'
              min='1'
              className='w-full border p-2 rounded'
              value={deviceForm.quantity}
              onChange={(e) => setDeviceForm({ ...deviceForm, quantity: parseInt(e.target.value) })}
            />
            <input
              type='text'
              placeholder='URL ảnh thiết bị'
              className='w-full border p-2 rounded'
              value={deviceForm.image}
              onChange={(e) => setDeviceForm({ ...deviceForm, image: e.target.value })}
            />
            <textarea
              placeholder='Mô tả chi tiết'
              className='w-full border p-2 rounded'
              value={deviceForm.description}
              onChange={(e) => setDeviceForm({ ...deviceForm, description: e.target.value })}
            ></textarea>
            <button className='w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded'>
              Thêm thiết bị
            </button>
          </form>
        </Modal>
      )}

      {/* Modal thêm danh mục */}
      {showCategoryModal && (
        <Modal onClose={() => setShowCategoryModal(false)} title='📂 Thêm danh mục'>
          <form onSubmit={handleAddCategory} className='space-y-4'>
            <input
              type='text'
              placeholder='Tên danh mục'
              className='w-full border p-2 rounded'
              value={categoryForm.category_name}
              onChange={(e) => setCategoryForm({ ...categoryForm, category_name: e.target.value })}
              required
            />
            <textarea
              placeholder='Mô tả'
              className='w-full border p-2 rounded'
              value={categoryForm.description}
              onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
            />
            <label className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={categoryForm.status}
                onChange={(e) => setCategoryForm({ ...categoryForm, status: e.target.checked })}
              />
              Kích hoạt
            </label>
            <button className='w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded'>
              Thêm danh mục
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

// Modal component tái sử dụng
const Modal = ({ onClose, title, children }) => (
  <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
    <div className='bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative'>
      <button
        onClick={onClose}
        className='absolute top-3 right-3 text-gray-500 hover:text-red-500'
      >
        <MdClose size={24} />
      </button>
      <h3 className='text-xl font-bold text-indigo-700 mb-4'>{title}</h3>
      {children}
    </div>
  </div>
);

export default AdminDevices;
