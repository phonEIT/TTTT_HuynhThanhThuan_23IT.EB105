import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeviceList from './DeviceList';
import { getUnreadNotificationCount } from '../../services/user/notificationService';

import hero1 from '../../assets/slide/dienthoai.jpg';
import hero2 from '../../assets/slide/macbook.jpg';
import hero3 from '../../assets/slide/apple.jpg';

const HomePage = () => {
  const images = [hero1, hero2, hero3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0); // số lượng thông báo chưa đọc

  const features = [
    {
      icon: '📋',
      title: 'Yêu cầu mượn thiết bị',
      description: 'Gửi và quản lý các yêu cầu mượn thiết bị của bạn.',
      path: '/request_borrow',
    },
    {
      icon: '⏰',
      title: 'Lịch sử mượn/trả',
      description: 'Theo dõi quá trình sử dụng thiết bị.',
      path: '/history',
    },
    {
      icon: '⚠️',
      title: 'Báo lỗi thiết bị',
      description: 'Gửi yêu cầu xử lý thiết bị gặp sự cố.',
      path: '/report',
    },
    {
      icon: '🔔',
      title: 'Thông báo',
      description: 'Xem các thông báo mới nhất từ hệ thống.',
      path: '/notification',
    },
  ];

  const stats = [
    { label: 'Thiết bị đang sử dụng', value: 36, icon: '💻' },
    { label: 'Thiết bị còn trống', value: 12, icon: '📦' },
    { label: 'Lượt mượn tháng này', value: 49, icon: '📈' },
    { label: 'Thiết bị lỗi chờ xử lý', value: 3, icon: '🛠️' },
  ];

  const steps = [
    { icon: '🔑', text: 'Đăng nhập bằng tài khoản nhân viên hoặc quản trị.' },
    { icon: '📋', text: 'Vào mục "Thiết bị" để xem danh sách thiết bị sẵn có.' },
    { icon: '📥', text: 'Nhấn "Mượn" hoặc "Trả" để thao tác.' },
    { icon: '❗', text: 'Báo lỗi nếu thiết bị gặp vấn đề.' },
    { icon: '🧑‍💼', text: 'Quản trị viên có thể xem và phê duyệt yêu cầu.' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Gọi API lấy số lượng thông báo chưa đọc
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const count = await getUnreadNotificationCount();
        setUnreadCount(count);
      } catch (error) {
        console.error('Không thể lấy số thông báo chưa đọc:', error);
      }
    };
    fetchUnreadCount();
  }, []);

  return (
    <div className='bg-gradient-to-br from-indigo-100 to-blue-50 text-gray-800 font-poppins'>
      {/* Hero Section */}
      <div className='relative h-[500px] overflow-hidden'>
        <div
          className='absolute inset-0 bg-cover bg-center transition-all duration-1000 blur-sm opacity-40'
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        ></div>
        <div className='relative z-10 text-center px-4 py-24'>
          <h1 className='text-4xl font-extrabold text-indigo-800 mb-4'>
            ✨ Hệ thống quản lý thiết bị ✨
          </h1>

          <p className='text-lg text-gray-700 max-w-xl mx-auto drop-shadow'>
            Theo dõi, mượn trả, báo lỗi thiết bị nhanh chóng và hiệu quả chỉ với
            vài thao tác.
          </p>
          <Link to='/devices'>
            <button className='mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'>
              Bắt đầu sử dụng
            </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <section className='py-16 px-6'>
        <h2 className='text-4xl font-extrabold text-center text-indigo-800 mb-12 drop-shadow'>
          🌟 Tính năng nổi bật
        </h2>
        <div className='grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>
          {features.map((f, index) => (
            <Link to={f.path} key={index} className='relative'>
              <div className='bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl hover:scale-105 transition duration-300'>
                <div className='text-4xl mb-4'>{f.icon}</div>
                <h3 className='font-semibold text-lg mb-2 text-indigo-700 flex justify-center items-center gap-2'>
                  {f.title}
                  {f.title === 'Thông báo' && unreadCount > 0 && (
                    <span className='w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs animate-pulse'>
                      {unreadCount}
                    </span>
                  )}
                </h3>
                <p className='text-gray-600 text-sm min-h-[40px]'>{f.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className='bg-gradient-to-tr from-white via-indigo-50 to-white py-16 px-6'>
        <h2 className='text-4xl font-extrabold text-indigo-800 text-center mb-10'>
          📊 Thống kê nhanh
        </h2>
        <div className='grid gap-8 grid-cols-2 md:grid-cols-4 text-center'>
          {stats.map((s, i) => (
            <div
              key={i}
              className='p-6 rounded-xl bg-white shadow hover:scale-105 transition-transform'
            >
              <div className='text-4xl mb-2'>{s.icon}</div>
              <div className='text-3xl font-bold text-indigo-700'>{s.value}</div>
              <div className='text-gray-600 text-sm mt-1'>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <DeviceList />

      {/* Guide Section */}
      <section className='py-16 px-6 text-center bg-gradient-to-br from-white via-indigo-50 to-white'>
        <h2 className='text-3xl font-extrabold text-indigo-700 mb-10 drop-shadow'>
          📘 Cách sử dụng hệ thống
        </h2>

        <div className='max-w-3xl mx-auto space-y-6'>
          {steps.map((step, index) => (
            <div
              key={index}
              className='flex items-center gap-4 bg-white border-l-4 border-indigo-500 p-5 rounded-md shadow hover:shadow-lg transition duration-300'
            >
              <div className='text-2xl bg-indigo-500 text-white w-10 h-10 rounded-full flex items-center justify-center'>
                {step.icon}
              </div>
              <p className='text-left text-gray-700 font-medium'>{step.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
