import React, { useState } from 'react';
import { userAPI } from '~services/api';
import Modal from '~components/Modal';

const UserCreate: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    cpf: '',
    telephone: '',
    table_number: 0,
  });

  const [modal, setModal] = useState({ isVisible: false, title: '', message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userAPI.createUser(formData);
      setModal({ isVisible: true, title: 'Sucesso', message: 'Usuário criado com sucesso!' });
    } catch (error) {
      setModal({ isVisible: true, title: 'Erro', message: 'Erro ao criar usuário.' });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Criar Novo Usuário</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="first_name"
          placeholder="Nome"
          value={formData.first_name}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="last_name"
          placeholder="Sobrenome"
          value={formData.last_name}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={formData.cpf}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="telephone"
          placeholder="Telefone"
          value={formData.telephone}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="number"
          name="table_number"
          placeholder="Número da Mesa (Opcional)"
          value={formData.table_number}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Criar Usuário
        </button>
      </form>
      <Modal
        title={modal.title}
        message={modal.message}
        isVisible={modal.isVisible}
        onClose={() => setModal({ ...modal, isVisible: false })}
      />
    </div>
  );
};

export default UserCreate;
