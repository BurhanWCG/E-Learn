import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedStudentRoute = ({ children }) => {
  const { isStudentAuthenticated} = useSelector(state => state.auth);

  
  const isAuthenticated = isStudentAuthenticated 

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedStudentRoute;
