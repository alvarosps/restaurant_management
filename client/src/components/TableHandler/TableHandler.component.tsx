import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TABLE_NUMBER } from '~/constants';
import { useAuth } from '~/context/AuthContext';
import Modal from '~components/Modal';

const TableHandler: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [localModalVisible, setLocalModalVisible] = useState(false);
  const { isAdmin, showTableModal, setShowTableModal, setTableNumber } = useAuth();

  useEffect(() => {
    const table = searchParams.get('table');

    if (showTableModal && !isAdmin) {
      setLocalModalVisible(true);
      setShowTableModal(false);
    } else if (table) {
      localStorage.setItem(TABLE_NUMBER, table);
      setTableNumber(table);
    } else if (!isAdmin) {
      const storedTable = localStorage.getItem(TABLE_NUMBER);
      if (!storedTable) {
        setLocalModalVisible(true);
      }
    }
  }, [searchParams, showTableModal, isAdmin, setShowTableModal]);

  const handleTableSubmit = (table: string) => {
    localStorage.setItem(TABLE_NUMBER, table);
    setTableNumber(table);
    setLocalModalVisible(false);
    setShowTableModal(false);
  };

  return (
    <>
      {localModalVisible && (
        <Modal
          title="Informe o número da mesa"
          message="Por favor, insira o número da mesa para continuar."
          isVisible={localModalVisible}
          onClose={() => setLocalModalVisible(false)}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = (e.target as HTMLFormElement).table as HTMLInputElement;
              handleTableSubmit(input.value);
            }}
          >
            <input
              type="number"
              name="table"
              placeholder="Número da mesa"
              className="w-full px-3 py-2 border rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-2"
            >
              Confirmar
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default TableHandler;
