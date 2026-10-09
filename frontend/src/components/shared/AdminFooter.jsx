// AdminFooter.jsx
import React from 'react';

const AdminFooter = () => {
  return (
    <footer className='bg-white border-t mt-10'>
      <div className='max-w-7xl mx-auto px-6 py-4 text-sm text-gray-500 text-center'>
        © {new Date().getFullYear()} Thiết Bị 247 Admin • All rights reserved
      </div>
    </footer>
  );
};

export default AdminFooter;
