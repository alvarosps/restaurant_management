import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '~services/api';
import { MenuItem } from '~/types';
import Button from '~components/Button';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await api.get<MenuItem[]>('menu-items/');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Erro ao buscar itens do cardápio:', error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Cardápio</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map(item => (
          <div key={item.id} className="border rounded shadow p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p>{item.description}</p>
              <p className="text-gray-600">Estoque: {item.stock}</p>
              <p className="font-bold">R$ {item.price.toFixed(2)}</p>
            </div>
            <Button
              label="Fazer Pedido"
              disabled={item.stock === 0}
              className="mt-2 w-full"
              onClick={() => navigate(`/customize-order/${item.id}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
