import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedTeacherRoute = ({ children }) => {
  const {  isTeacherAuthenticated} = useSelector(state => state.auth);

  
  const isAuthenticated =  isTeacherAuthenticated 

  return isAuthenticated ? children : <Navigate to="/teacher-login" />;
};

export default ProtectedTeacherRoute;
