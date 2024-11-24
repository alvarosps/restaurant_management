import React from 'react';
import { Navigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '~/constants';

interface PrivateRouteProps {
  component: React.ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  return token ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
