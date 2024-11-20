import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from '~pages/Login';
import AdminPanel from '~pages/AdminPanel';
import Home from '~pages/Home';
import OrderCustomization from '~pages/OrderCustomization';
import AdminUserList from './pages/AdminUserList';
import OrderAudit from './pages/OrderAudit';

const AppRoutes: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
        }
    }, [navigate]);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin/users" element={<AdminUserList />} />
            <Route path="/" element={<Home />} />
            <Route path="/customize-order/:id" element={<OrderCustomization />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/audits" element={<OrderAudit />} />
        </Routes>
    );
};

export default AppRoutes;
