import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 py-10 mt-16 border-t border-indigo-200'>
      <div className='container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
        {/* Cột 1: Logo + mô tả */}
        <div>
          <h2 className='text-xl font-bold mb-2 text-indigo-800'>
            Thiết Bị 247
          </h2>
          <p className='text-sm text-slate-700'>
            Hệ thống quản lý thiết bị chuyên nghiệp, hỗ trợ theo dõi – mượn –
            trả – báo lỗi hiệu quả cho doanh nghiệp và trường học.
          </p>
        </div>

        {/* Liên kết */}
        <div>
          <h3 className='text-lg font-semibold mb-3'>Liên kết</h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <a href='/' className='hover:underline hover:text-indigo-700'>
                Trang chủ
              </a>
            </li>
            <li>
              <a
                href='/devices'
                className='hover:underline hover:text-indigo-700'
              >
                Danh sách thiết bị
              </a>
            </li>
            <li>
              <a
                href='/contact'
                className='hover:underline hover:text-indigo-700'
              >
                Liên hệ
              </a>
            </li>
            <li>
              <a
                href='/login'
                className='hover:underline hover:text-indigo-700'
              >
                Đăng nhập
              </a>
            </li>
          </ul>
        </div>

        {/* Hỗ trợ */}
        <div>
          <h3 className='text-lg font-semibold mb-3'>Hỗ trợ</h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <a href='#' className='hover:underline hover:text-indigo-700'>
                Câu hỏi thường gặp
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline hover:text-indigo-700'>
                Hướng dẫn sử dụng
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline hover:text-indigo-700'>
                Chính sách bảo mật
              </a>
            </li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <h3 className='text-lg font-semibold mb-3'>Liên hệ</h3>
          <p className='text-sm'>
            📧 Email:{' '}
            <span className='text-indigo-600'>support@thietbi247.vn</span>
          </p>
          <p className='text-sm'>
            📞 Hotline: <span className='text-indigo-600'>0901 234 567</span>
          </p>
          <p className='text-sm'>
            📍 Địa chỉ:{' '}
            <span className='text-indigo-600'>123 Lê Lợi, Quận 1, TP.HCM</span>
          </p>
        </div>
      </div>

      <div className='mt-10 border-t border-indigo-200 pt-4 text-center text-sm text-indigo-600'>
        &copy; {new Date().getFullYear()} Thiết Bị 247. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
