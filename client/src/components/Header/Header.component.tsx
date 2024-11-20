import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const token = localStorage.getItem('token');
  const tableNumber = localStorage.getItem('tableNumber');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  const showBackButton =
    location.pathname !== '/' && location.pathname !== '/login';

  return (
    <header className="bg-blue-600 text-white py-3 px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center">
      <div className="mb-2 sm:mb-0 flex items-center">
        {showBackButton && (
          <button
            onClick={() => navigate('/')}
            className="bg-gray-200 text-blue-600 px-2 py-1 rounded mr-2 hover:bg-gray-300"
          >
            Voltar ao Menu
          </button>
        )}
        <Link to="/" className="text-lg font-bold">
          Restaurante
        </Link>
      </div>
      <nav className="flex space-x-2 items-center">
        {tableNumber && (
          <div className="bg-gray-100 text-blue-600 text-sm px-3 py-1 rounded-full font-medium">
            Mesa {tableNumber}
          </div>
        )}
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/order-history" className="hover:underline">
          Histórico
        </Link>
        {token ? (
          <>
            <Link to="/admin" className="hover:underline">
              Admin Panel
            </Link>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
