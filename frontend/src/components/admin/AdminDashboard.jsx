import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaLaptop,
  FaClipboardCheck,
  FaChartBar,
  FaUsers,
  FaRobot,
  FaCog,
} from 'react-icons/fa';

const AdminDashboard = () => {
  const adminName = localStorage.getItem('adminName') || 'Quản trị viên';

  const cards = [
    {
      title: 'Quản lý thiết bị',
      icon: (
        <FaLaptop className='text-4xl text-indigo-500 group-hover:scale-110' />
      ),
      path: '/admin/devices',
    },
    {
      title: 'Phê duyệt yêu cầu',
      icon: (
        <FaClipboardCheck className='text-4xl text-yellow-500 group-hover:scale-110' />
      ),
      path: '/admin/approval',
    },
    {
      title: 'Lịch sử mượn trả',
      icon: (
        <FaChartBar className='text-4xl text-green-600 group-hover:scale-110' />
      ),
      path: '/admin/history',
    },
    {
      title: 'Quản lý người dùng',
      icon: (
        <FaUsers className='text-4xl text-pink-500 group-hover:scale-110' />
      ),
      path: '/admin/users',
    },
    {
      title: 'Xử lý báo cáo lỗi',
      icon: <FaCog className='text-4xl text-gray-500 group-hover:scale-110' />,
      path: '/admin/settings',
    },
    {
      title: 'Trợ lý ảo Chatbot',
      icon: (
        <FaRobot className='text-4xl text-blue-500 group-hover:scale-110' />
      ),
      path: '/admin/chatbot',
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 to-white font-sans'>
      {/* Header */}

      {/* Main Content */}
      <main className='max-w-6xl mx-auto px-6 py-10'>
        <h2 className='text-3xl font-bold text-indigo-800 mb-8 text-center'>
          ✨ Bảng điều khiển quản trị ✨
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
          {cards.map((card, idx) => (
            <Link
              to={card.path}
              key={idx}
              className='group bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
            >
              {card.icon}
              <h3 className='text-lg font-semibold mt-4 text-indigo-700'>
                {card.title}
              </h3>
            </Link>
          ))}
        </div>
      </main>
    
    </div>
  );
};

export default AdminDashboard;
