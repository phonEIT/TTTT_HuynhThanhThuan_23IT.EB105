import React from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const ContactPage = () => {
  return (
    <div className='bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen px-6 py-16 font-poppins'>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12'>
        <h1 className='text-4xl font-extrabold text-indigo-700 text-center mb-6'>📬 Liên hệ với chúng tôi</h1>
        <p className='text-center text-gray-600 mb-12'>Chúng tôi luôn sẵn sàng hỗ trợ bạn. Gửi thắc mắc hoặc góp ý bất cứ lúc nào!</p>

        <div className='grid md:grid-cols-2 gap-10'>
          {/* Form liên hệ */}
          <form className='space-y-6'>
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-700'>Họ và tên</label>
              <input type='text' placeholder='Nguyễn Văn A' className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none'/>
            </div>
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-700'>Email</label>
              <input type='email' placeholder='email@domain.com' className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none'/>
            </div>
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-700'>Nội dung</label>
              <textarea rows='5' placeholder='Nhập nội dung cần hỗ trợ...' className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none'/>
            </div>
            <button type='submit' className='w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition'>Gửi liên hệ</button>
          </form>

          {/* Thông tin liên hệ */}
          <div className='space-y-6'>
            <div className='flex items-start gap-4'>
              <FiMapPin className='text-2xl text-indigo-600' />
              <div>
                <h4 className='font-semibold text-indigo-700'>Địa chỉ</h4>
                <p className='text-gray-600 text-sm'>123 Đường ABC, Quận 1, TP. Hồ Chí Minh</p>
              </div>
            </div>
            <div className='flex items-start gap-4'>
              <FiPhone className='text-2xl text-indigo-600' />
              <div>
                <h4 className='font-semibold text-indigo-700'>Số điện thoại</h4>
                <p className='text-gray-600 text-sm'>(+84) 912 345 678</p>
              </div>
            </div>
            <div className='flex items-start gap-4'>
              <FiMail className='text-2xl text-indigo-600' />
              <div>
                <h4 className='font-semibold text-indigo-700'>Email</h4>
                <p className='text-gray-600 text-sm'>lienhe@thietbi247.vn</p>
              </div>
            </div>
            <div className='rounded-lg overflow-hidden mt-6'>
              <iframe
                title='Bản đồ'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.427324626718!2d106.70042411474991!3d10.776389892322985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f193f44f8c7%3A0x7ef59dbb1c9c2511!2zMjMzIEzGsHUgVGjhu40gQ2jDrW5oLCBQaMaw4budbmcgOCwgUXXhuq1uIDMsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmlldG5hbQ!5e0!3m2!1svi!2s!4v1636467716831!5m2!1svi!2s'
                width='100%'
                height='200'
                style={{ border: 0 }}
                allowFullScreen=''
                loading='lazy'
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;