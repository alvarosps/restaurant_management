import React, { useEffect, useState } from 'react';
import api from '~services/api';
import { ReportItem, MenuItem } from '~/types';
import Modal from '~components/Modal';
import BarChart from '~components/BarChart';
import { translateStatus } from '~/utils';

const CURRENT_ENV = import.meta.env.VITE_CURRENT_ENV || 'local';

const AdminPanel: React.FC = () => {
  const [reportData, setReportData] = useState<ReportItem[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [audits, setAudits] = useState<any[]>([]);
  const [modal, setModal] = useState({ isVisible: false, title: '', message: '' });
  const [updatedStocks, setUpdatedStocks] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reportsResponse, menuItemsResponse, auditsResponse] = await Promise.all([
          api.get<ReportItem[]>('menu/reports/'),
          api.get<MenuItem[]>('menu/items/'),
          api.get('menu/orders/audits/'),
        ]);
        setReportData(reportsResponse.data);
        setMenuItems(menuItemsResponse.data);
        setAudits(auditsResponse.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setModal({ isVisible: true, title: 'Erro', message: 'Erro ao carregar dados do painel.' });
      }
    };

    fetchData();
  }, []);

  const updateStock = async (itemId: number) => {
    const newStock = updatedStocks[itemId];
    if (newStock === undefined) return;

    try {
      await api.patch(`menu/items/${itemId}/update-stock/`, { stock: newStock });
      setModal({ isVisible: true, title: 'Sucesso', message: 'Estoque atualizado com sucesso!' });
      setMenuItems(menuItems.map(item => (item.id === itemId ? { ...item, stock: newStock } : item)));
      setUpdatedStocks((prev) => {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      });
    } catch (error) {
      setModal({ isVisible: true, title: 'Erro', message: `Erro ao atualizar estoque: ${error}.` });
    }
  };

  const auditHeaders = ['Pedido', 'Status', 'Data'];
  const auditRows = audits.map(audit => [
    audit.order,
    audit.status,
    new Date(audit.changed_at).toLocaleString(),
  ]);

  const handleExport = (format: string) => {
    const baseURL =
      CURRENT_ENV === 'prod'
        ? 'https://restaurant-management-xd6i.onrender.com/api/'
        : 'http://localhost:8000/api/';
    const url = `${baseURL}menu/reports/export-${format}/`;
    window.open(url, '_blank');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Painel Administrativo</h1>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Gráfico de Pedidos</h2>
        <BarChart
          labels={reportData.map(item => item.name)}
          data={reportData.map(item => item.total_orders)}
          label="Quantidade de Pedidos"
        />
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => handleExport('csv')}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Exportar CSV
        </button>
        <button
          onClick={() => handleExport('pdf')}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Exportar PDF
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Atualizar Estoque</h2>
        <div className="space-y-2">
          {menuItems.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 bg-gray-100 p-2 rounded shadow-sm"
            >
              {/* Item Name */}
              <p className="flex-1">{item.name} (Estoque: {item.stock})</p>

              {/* Input Field */}
              <input
                type="number"
                className="flex-shrink-0 border rounded px-2 py-1 w-20"
                placeholder="Novo estoque"
                value={updatedStocks[item.id] || ''}
                onChange={(e) =>
                  setUpdatedStocks((prev) => ({ ...prev, [item.id]: Number(e.target.value) }))
                }
              />

              {/* Update Button */}
              <button
                onClick={() => updateStock(item.id)}
                className="flex-shrink-0 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Atualizar
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Auditoria de Pedidos</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white rounded shadow-md">
            <thead className="bg-blue-500 text-white">
              <tr>
                {auditHeaders.map((header) => (
                  <th key={header} className="px-4 py-2 text-left">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {auditRows.map((row, index) => (
                <tr key={index} className="border-t">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-2">
                      {cellIndex === 1 ? translateStatus(cell) : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        title={modal.title}
        message={modal.message}
        isVisible={modal.isVisible}
        onClose={() => setModal({ ...modal, isVisible: false })}
      />
    </div>
  );
};

export default AdminPanel;
