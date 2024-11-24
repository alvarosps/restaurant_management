import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '~pages/Login';
import AdminPanel from '~pages/AdminPanel';
import Home from '~pages/Home';
import OrderCustomization from '~pages/OrderCustomization';
import AdminUserList from '~pages/AdminUserList';
import OrderAudit from '~pages/OrderAudit';
import UserCreate from '~pages/UserCreate';
import OrderHistory from '~pages/OrderHistory';
import PrivateRoute from '~components/PrivateRoute';
import MyOrders from '~pages/MyOrders';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user-create" element={<UserCreate />} />
      <Route path="/customize-order/:id" element={<OrderCustomization />} />
      <Route path="/my-orders" element={<MyOrders />} />

      {/* Rotas que exigem autenticação */}
      <Route path="/admin/users" element={<PrivateRoute component={AdminUserList} />} />
      <Route path="/admin" element={<PrivateRoute component={AdminPanel} />} />
      <Route path="/order-history" element={<PrivateRoute component={OrderHistory} />} />
      <Route path="/order-audit" element={<PrivateRoute component={OrderAudit} />} />
    </Routes>
  );
};

export default AppRoutes;
