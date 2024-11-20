import React, { useEffect, useState } from 'react';
import api from '~services/api';
import { ReportItem, MenuItem } from '~/types';
import Modal from '~components/Modal';
import Table from '~components/Table';
import BarChart from '~components/BarChart';

const AdminPanel: React.FC = () => {
  const [reportData, setReportData] = useState<ReportItem[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [audits, setAudits] = useState<any[]>([]);
  const [modal, setModal] = useState({ isVisible: false, title: '', message: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reportsResponse, menuItemsResponse, auditsResponse] = await Promise.all([
          api.get<ReportItem[]>('reports/'),
          api.get<MenuItem[]>('menu-items/'),
          api.get('orders/audits/'),
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

  const updateStock = async (itemId: number, stock: number) => {
    try {
      await api.patch(`menu-items/${itemId}/update-stock/`, { stock });
      setModal({ isVisible: true, title: 'Sucesso', message: 'Estoque atualizado com sucesso!' });
      setMenuItems(menuItems.map(item => (item.id === itemId ? { ...item, stock } : item)));
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
    const url = `http://localhost:8000/api/reports/export-${format}/`;
    window.open(url, '_blank'); // Abre o link em uma nova aba
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
        {menuItems.map(item => (
          <div key={item.id} className="flex items-center mb-2">
            <p className="mr-4">{item.name} (Estoque: {item.stock})</p>
            <input
              type="number"
              className="border rounded px-2 py-1"
              placeholder="Novo estoque"
              onBlur={(e) => updateStock(item.id, Number(e.target.value))}
            />
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Auditoria de Pedidos</h2>
        <Table headers={auditHeaders} rows={auditRows} />
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
