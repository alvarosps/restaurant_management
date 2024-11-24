import React, { useEffect, useState } from 'react';
import api from '~services/api';
import { Order } from '~/types';
import Modal from '~components/Modal';
import { TABLE_NUMBER } from '~/constants';

const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [modal, setModal] = useState({ isVisible: false, title: '', message: '' });
  const tableNumber = localStorage.getItem(TABLE_NUMBER);

  const fetchOrders = async () => {
    try {
      const endpoint = `menu/orders/table/${tableNumber}/`;
      const response = await api.get<Order[]>(endpoint);
      setOrders(response.data);

      // Calcula o total da mesa
      const totalValue = response.data.reduce((sum, order) => sum + order.quantity * order.menu_item_price, 0);
      setTotal(totalValue);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      setModal({ isVisible: true, title: 'Erro', message: 'Erro ao carregar pedidos.' });
    }
  };

  const handlePayment = async () => {
  try {
    const response = await api.post('menu/orders/payment/', { table_number: tableNumber });
    setModal({ 
      isVisible: true, 
      title: 'Sucesso', 
      message: `Pagamento realizado com sucesso! Pedidos pagos: ${response.data.orders}.` 
    });
    fetchOrders();
  } catch (error) {
    console.error('Erro ao processar pagamento:', error);
    setModal({ 
      isVisible: true, 
      title: 'Erro', 
      message: 'Erro ao processar pagamento. Verifique os pedidos pendentes.' 
    });
  }
};


  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Meus Pedidos: Mesa {tableNumber}</h1>
          <div className="overflow x-auto">
            <table className="w-full table-auto bg-white rounded shadow-md overflow-x-auto">
                <thead className="bg-gray-800 text-white">
                <tr>
                    <th className="px-4 py-2 text-left">Item</th>
                    <th className="px-4 py-2 text-center">Quantidade</th>
                    <th className="px-4 py-2 text-center">Preço Unitário</th>
                    <th className="px-4 py-2 text-center">Subtotal</th>
                    <th className="px-4 py-2 text-center">Status</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id} className="border-t">
                    <td className="px-4 py-2">{order.menu_item_name}</td>
                    <td className="px-4 py-2">{order.quantity}</td>
                    <td className="px-4 py-2">R$ {order.menu_item_price.toFixed(2)}</td>
                    <td className="px-4 py-2">R$ {(order.quantity * order.menu_item_price).toFixed(2)}</td>
                    <td className="px-4 py-2">{order.status}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
      <p className="text-right font-bold mt-4">Total: R$ {total.toFixed(2)}</p>
      <button
        onClick={handlePayment}
        className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Fazer Pagamento
      </button>
      <Modal
        title={modal.title}
        message={modal.message}
        isVisible={modal.isVisible}
        onClose={() => setModal({ ...modal, isVisible: false })}
      />
    </div>
  );
};

export default MyOrders;
