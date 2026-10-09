  // AdminHeader.jsx
  import React, { useState, useEffect } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { FiSettings, FiBell, FiLogOut, FiUser } from 'react-icons/fi';
  import { logoutApi, getToken } from '../../services/admin/AuthService';

  const AdminHeader = () => {
    const navigate = useNavigate();
    const [token, setTokenState] = useState(null);

    useEffect(() => {
      setTokenState(getToken());
    }, []);

    const handleLogout = async () => {
      try {
        await logoutApi();
        sessionStorage.removeItem('accessToken'); // xoá token
        setTokenState(null);
        navigate('/login');
      } catch (error) {
        console.error('Lỗi khi đăng xuất:', error);
        sessionStorage.removeItem('accessToken');
        setTokenState(null);
        navigate('/login');
      }
    };

    return (
      <header className='bg-gradient-to-r from-indigo-50 to-purple-100 shadow-md sticky top-0 z-50 border-b border-indigo-200'>
        <div className='max-w-7xl mx-auto px-4 py-3 flex justify-between items-center'>
          {/* Logo */}
          <Link to='/admin' className='hover:scale-105 transition-transform duration-200'>
            <h1 className='text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 transition-all duration-300 ease-in-out'>
              Thiết Bị <span className='font-black'>247</span>
            </h1>
          </Link>

          {/* Admin info and icons */}
          <div className='flex items-center gap-3 text-gray-600'>
            {token ? (
              <>
                <span className='hidden sm:inline-block text-sm'>Xin chào, <strong>Quản trị viên</strong></span>

                <Link
                  to='/admin/my-info'
                  className='p-2 rounded-full hover:bg-indigo-200 transition-colors duration-200'
                  title='Thông tin của tôi'
                >
                  <FiUser className='text-xl' />
                </Link>

                <button
                  className='p-2 rounded-full hover:bg-indigo-200 transition-colors duration-200'
                  title='Thông báo'
                >
                  <FiBell className='text-xl' />
                </button>

                <button
                  className='p-2 rounded-full hover:bg-purple-200 transition-colors duration-200'
                  title='Cài đặt'
                >
                  <FiSettings className='text-xl' />
                </button>

                <button
                  onClick={handleLogout}
                  className='p-2 rounded-full hover:bg-red-100 text-red-500 transition-colors duration-200'
                  title='Đăng xuất'
                >
                  <FiLogOut className='text-xl' />
                </button>
              </>
            ) : (
              <Link
                to='/login'
                className='px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200'
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </header>
    );
  };

  export default AdminHeader;
