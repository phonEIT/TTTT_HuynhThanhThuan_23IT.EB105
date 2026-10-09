
import React, { useState } from 'react';
import { loginApi, setToken, getScopeFromToken } from '../../services/admin/AuthService';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginApi(username, password);
      if (data.code === 1000 && data.data?.token) {
        const token = data.data.token;
        setToken(token);
        const scopes = getScopeFromToken(token);

        if (scopes.includes('ROLE_ADMIN')) window.location.href = '/admin';   
        else if (scopes.includes('ROLE_TECHNICIAN')) window.location.href = '/technician';
        else window.location.href = '/';
      } else {
        setErrorMsg('Sai thông tin đăng nhập!');
      }
    } catch (error) {
      setErrorMsg(error.message || 'Lỗi khi kết nối đến server.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-indigo-200">
      <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md border border-indigo-100">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent mb-8">
          Đăng nhập hệ thống
        </h2>

        {errorMsg && (
          <div className="mb-4 text-red-600 text-center font-medium">{errorMsg}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute top-3 left-4 text-indigo-500" />
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-800 placeholder-gray-400"
              placeholder="Tên đăng nhập"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-3 left-4 text-indigo-500" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-800 placeholder-gray-400"
              placeholder="Mật khẩu"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-semibold rounded-xl text-white shadow-md bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 transition-all duration-200"
          >
            Đăng nhập
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} Thiết Bị 247 — Hệ thống quản lý thiết bị
        </p>
      </div>
    </div>
  );
};

export default Login;

