import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiLogIn } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { getToken, logoutApi } from '../../services/admin/AuthService';
import { jwtDecode } from 'jwt-decode';
import { searchDevicesApi } from '../../services/admin/DeviceService';

const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(getToken());
  const [username, setUsername] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    const devices = await searchDevicesApi(searchTerm.trim());
    if (devices.length > 0) {
      navigate(`/detail/${encodeURIComponent(searchTerm.trim())}`, {
        state: { products: devices },
      });
    } else {
      alert('Không tìm thấy thiết bị');
    }
  };

  useEffect(() => {
    const handleTokenChange = () => {
      const tk = getToken();
      setToken(tk);
      if (tk) {
        try {
          const decoded = jwtDecode(tk);
          setUsername(decoded.username || decoded.name || 'Tài khoản');
        } catch {
          setUsername('Tài khoản');
        }
      } else {
        setUsername('');
      }
    };
    handleTokenChange();
    window.addEventListener('storage', handleTokenChange);
    window.addEventListener('tokenChanged', handleTokenChange);
    return () => {
      window.removeEventListener('storage', handleTokenChange);
      window.removeEventListener('tokenChanged', handleTokenChange);
    };
  }, []);

  const handleLogout = async () => {
    await logoutApi();
    sessionStorage.removeItem('accessToken');
    setToken(null);
    window.dispatchEvent(new Event('tokenChanged'));
    navigate('/login');
  };

  return (
    <header className='bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-100'>
      <div className='max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        {/* Logo */}
        <Link
          to='/'
          className='text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform duration-200'
        >
          Thiết Bị <span className='font-black'>247</span>
        </Link>

        {/* Ô tìm kiếm */}
        <form className='relative w-full md:w-1/2' onSubmit={handleSearch}>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder=' Tìm kiếm thiết bị...'
            className='w-full pl-12 pr-4 py-2 text-black rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm transition'
          />
          <FiSearch
            className='absolute top-2.5 left-4 text-gray-500 text-lg cursor-pointer'
            onClick={handleSearch}
          />
        </form>

        {/* Menu điều hướng */}
        <nav className='flex items-center space-x-6 text-sm font-medium'>
          {['Trang chủ', 'Thiết bị', 'Liên hệ'].map((label, idx) => (
            <Link
              key={idx}
              to={`/${
                label === 'Trang chủ'
                  ? ''
                  : label === 'Thiết bị'
                  ? 'devices'
                  : label.toLowerCase()
              }`}
              className='text-gray-700 hover:text-indigo-600 transition-all duration-200'
            >
              {label}
            </Link>
          ))}

          {/* Đăng nhập / Dropdown người dùng */}
          {token ? (
            <div className='relative group'>
              <button className='flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-md transition-all duration-200'>
                <FaUserCircle className='text-2xl' />
                <span className='font-medium'>{username}</span>
              </button>

              {/* Dropdown */}
              <div className='absolute right-0 mt-2 w-44 bg-gradient-to-br from-white/90 to-gray-50/80 backdrop-blur-xl border border-gray-100 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200'>
                <Link
                  to='/my-info'
                  className='block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-200'
                >
                  Thông tin cá nhân
                </Link>
                <button
                  onClick={handleLogout}
                  className='w-full text-left px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-600 transition-all duration-200'
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <Link
              to='/login'
              className='flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-200'
            >
              <FiLogIn className='text-lg' /> Đăng nhập
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
