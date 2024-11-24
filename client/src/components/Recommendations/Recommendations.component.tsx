import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '~services/api';
import { MenuItem } from '~/types';
import Button from '~components/Button';

const Recommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await api.get<MenuItem[]>('menu/recommendations/');
        setRecommendations(response.data);
      } catch (error) {
        console.error('Erro ao buscar recomendações:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return <p className="text-center">Carregando recomendações...</p>;
  }

  if (recommendations.length === 0) {
    return <p className="text-center">Nenhuma recomendação disponível no momento.</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((item) => (
          <div key={item.id} className="border rounded shadow p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p>{item.description}</p>
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

export default Recommendations;
