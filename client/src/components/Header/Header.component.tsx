import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN, TABLE_NUMBER } from '~/constants';
import Modal from '~components/Modal';
import api from '~services/api';

const Header: React.FC = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const storedTableNumber = localStorage.getItem(TABLE_NUMBER);
  const [tableNumber, setTableNumber] = useState(storedTableNumber);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      api.get('users/me/').then((response) => {
        setIsAdmin(response.data.is_admin);
      });
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    navigate('/login');
  };

  const showBackButton =
    location.pathname !== '/' && location.pathname !== '/login';

  const handleTableClick = () => {
    setNewTableNumber(tableNumber || '');
    setIsModalVisible(true);
  };

  const confirmTableChange = async () => {
    localStorage.setItem(TABLE_NUMBER, newTableNumber);
    setTableNumber(newTableNumber);
    setIsModalVisible(false);

    if (token) {
      try {
        await api.patch('users/me/', { table_number: newTableNumber });
      } catch (error) {
        console.error('Erro ao atualizar o número da mesa:', error);
      }
    }
  };

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
        {tableNumber && !isAdmin && (
          <div
            onClick={handleTableClick}
            className="bg-gray-100 text-blue-600 text-sm px-3 py-1 rounded-full font-medium cursor-pointer hover:bg-gray-200"
            title="Clique para editar o número da mesa"
          >
            Mesa {tableNumber}
          </div>
        )}
        <Link to="/" className="hover:underline">
          Cardápio
        </Link>
        {isAdmin ? (
          <Link to="/order-history" className="hover:underline">
            Histórico de Pedidos
          </Link>
        ) : (
          <Link to="/my-orders" className="hover:underline">
            Meus Pedidos
          </Link>
        )}
        {token ? (
          <>
            {isAdmin && (
              <Link to="/admin" className="hover:underline">
                Admin Panel
              </Link>
            )}
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

      {isModalVisible && (
        <Modal
          title="Editar número da mesa"
          message="Tem certeza de que deseja alterar o número da mesa?"
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        >
          <input
            type="number"
            value={newTableNumber}
            onChange={(e) => setNewTableNumber(e.target.value)}
            className="w-full px-3 py-2 border rounded mt-2"
            placeholder="Digite o novo número da mesa"
          />
          <button
            onClick={confirmTableChange}
            className="w-full bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Confirmar
          </button>
          <button
            onClick={() => setIsModalVisible(false)}
            className="w-full bg-gray-300 text-black px-4 py-2 rounded mt-2"
          >
            Cancelar
          </button>
        </Modal>
      )}
    </header>
  );
};

export default Header;
