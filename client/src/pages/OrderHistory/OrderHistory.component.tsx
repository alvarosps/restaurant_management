import React, { useEffect, useState } from 'react';
import api from '~services/api';
import { Order } from '~/types';
import Modal from '~components/Modal';

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [modal, setModal] = useState({ isVisible: false, title: '', message: '' });

  const fetchOrders = async () => {
    try {
      const response = await api.get<Order[]>('menu/orders/history/', {
        params: { status: statusFilter, start_date: startDate, end_date: endDate },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
      setModal({ isVisible: true, title: 'Erro', message: 'Erro ao carregar histórico de pedidos.' });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, startDate, endDate]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Meu Histórico de Pedidos</h1>
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <select
          value={statusFilter}
          className="border rounded px-3 py-2"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="Pending">Pendente</option>
          <option value="Paid">Pago</option>
          <option value="Cancelled">Cancelado</option>
          <option value="Refunded">Reembolsado</option>
        </select>
        <input
          type="date"
          value={startDate}
          className="border rounded px-3 py-2"
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          className="border rounded px-3 py-2"
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <table className="w-full table-auto bg-white rounded shadow-md overflow-x-auto">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2">Quantidade</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Data</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="px-4 py-2">{order.id}</td>
              <td className="px-4 py-2">{order.menu_item__name}</td>
              <td className="px-4 py-2">{order.quantity}</td>
              <td className="px-4 py-2">{order.status}</td>
              <td className="px-4 py-2">{new Date(order.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        title={modal.title}
        message={modal.message}
        isVisible={modal.isVisible}
        onClose={() => setModal({ ...modal, isVisible: false })}
      />
    </div>
  );
};

export default OrderHistory;
