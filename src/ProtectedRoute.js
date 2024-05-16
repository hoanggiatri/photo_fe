import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isLoggedIn, ...props }) => {
  // Sử dụng Navigate để chuyển hướng nếu chưa đăng nhập
  return isLoggedIn ? <Route {...props} element={element} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;