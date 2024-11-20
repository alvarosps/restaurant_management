import React, { useEffect, useState } from 'react';
import api from '~services/api';
import Table from '~components/Table';
import Modal from '~components/Modal';
import { OrderAudit as OrderAuditType } from '~/types';

const OrderAudit: React.FC = () => {
  const [audits, setAudits] = useState<OrderAuditType[]>([]);
  const [modal, setModal] = useState({ isVisible: false, title: '', message: '' });

  useEffect(() => {
    const fetchAudits = async () => {
      try {
        const response = await api.get<OrderAuditType[]>('orders/audits/');
        setAudits(response.data);
      } catch (error) {
        setModal({ isVisible: true, title: 'Erro', message: 'Erro ao carregar auditorias.' });
      }
    };
    fetchAudits();
  }, []);

  const auditHeaders = ['ID', 'Pedido', 'Status', 'Data de Alteração'];
  const auditRows = audits.map((audit) => [
    audit.id,
    audit.order,
    audit.status,
    new Date(audit.changed_at).toLocaleString(),
  ]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Auditorias de Pedidos</h1>
      <Table headers={auditHeaders} rows={auditRows} />
      <Modal
        title={modal.title}
        message={modal.message}
        isVisible={modal.isVisible}
        onClose={() => setModal({ ...modal, isVisible: false })}
      />
    </div>
  );
};

export default OrderAudit;
