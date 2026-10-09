import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getToken } from '../../services/admin/AuthService'; // hàm này trả về token từ localStorage

const PrivateRoute = () => {
  const token = getToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
