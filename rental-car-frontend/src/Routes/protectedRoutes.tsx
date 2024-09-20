import  { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthToken } from '@/utils/auth';  // Adjust the path according to your project structure

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = getAuthToken();

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;