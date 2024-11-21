import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '~services/api';
import { MenuItem } from '~/types';
import Modal from '~components/Modal';

const OrderCustomization: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');
  const [modal, setModal] = useState({
    isVisible: false,
    title: '',
    message: '',
    action: null as (() => void) | null, // Adicionado para ações no modal
  });

  const tableNumber = localStorage.getItem('tableNumber'); // Verifica se há uma mesa definida
  const token = localStorage.getItem('token'); // Verifica se o usuário está autenticado

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await api.get<MenuItem>(`menu-items/${id}/`);
        setMenuItem(response.data);
      } catch (error) {
        console.error('Erro ao buscar item do cardápio:', error);
        navigate('/');
      }
    };

    fetchMenuItem();
  }, [id, navigate]);

  const handleOrder = async () => {
    if (!token && tableNumber) {
      // Se não estiver logado mas tiver mesa, pergunta se quer logar
      setModal({
        isVisible: true,
        title: 'Login Opcional',
        message: 'Deseja fazer login para associar o pedido ao seu perfil?',
        action: handleOptionalLogin,
      });
      return;
    }

    try {
      await api.post('orders/', {
        menu_item: menuItem?.id,
        quantity,
        notes,
        table_number: tableNumber, // Inclui o número da mesa no pedido
      });
      setModal({ isVisible: true, title: 'Sucesso', message: 'Pedido realizado com sucesso!', action: null });
    } catch (error) {
      setModal({ isVisible: true, title: 'Erro', message: 'Erro ao realizar o pedido.', action: null });
    }
  };

  const handleOptionalLogin = () => {
    navigate('/login'); // Redireciona para a página de login
  };

  if (!menuItem) return <p>Carregando...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Personalizar Pedido</h1>
      <h2 className="text-xl">{menuItem.name}</h2>
      <p>{menuItem.description}</p>
      <p className="font-bold">Preço Unitário: R$ {menuItem.price.toFixed(2)}</p>

      <label className="block mb-2">
        Quantidade:
        <input
          type="number"
          value={quantity}
          min="1"
          className="w-full px-3 py-2 border rounded mt-1"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </label>
      <label className="block mb-4">
        Observações:
        <textarea
          value={notes}
          className="w-full px-3 py-2 border rounded"
          onChange={(e) => setNotes(e.target.value)}
        />
      </label>
      <button
        onClick={handleOrder}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Confirmar Pedido
      </button>
      <button
        onClick={() => navigate('/')}
        className="w-full mt-2 bg-gray-200 text-blue-600 px-4 py-2 rounded hover:bg-gray-300"
      >
        Voltar ao Menu
      </button>

      <Modal
        title={modal.title}
        message={modal.message}
        isVisible={modal.isVisible}
        onClose={() => setModal({ ...modal, isVisible: false })}
      >
        {modal.action && (
          <button
            onClick={modal.action}
            className="w-full bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            Fazer Login
          </button>
        )}
        <button
          onClick={() => setModal({ ...modal, isVisible: false })}
          className="w-full bg-gray-300 text-black px-4 py-2 rounded mt-2"
        >
          Continuar sem Login
        </button>
      </Modal>
    </div>
  );
};

export default OrderCustomization;
