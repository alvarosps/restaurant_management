import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { userAPI } from '~services/api';
import Modal from '~components/Modal';
import { useNavigate } from 'react-router-dom';

const UserCreate: React.FC = () => {
  const navigate = useNavigate();
  const [createdUserSuccess, setCreatedUserSuccess] = useState(false);

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
      setCreatedUserSuccess(true);
    } catch (error) {
      const errorMessages = [];
      const errors = (error as any).response.data;
      for (const key in errors) {
        errorMessages.push(errors[key]);
      }
      setModal({
        isVisible: true,
        title: 'Erro',
        message: 'Erro ao criar usuário: ' + errorMessages.join('\n'),
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Criar Novo Usuário</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="first_name" className="block">
          Nome:
          <input
            type="text"
            id="first_name"
            name="first_name"
            placeholder="Nome"
            value={formData.first_name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded mt-1"
          />
        </label>
        <label htmlFor="last_name" className="block">
          Sobrenome:
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Sobrenome"
            value={formData.last_name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded mt-1"
          />
        </label>
        <label htmlFor="email" className="block">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded mt-1"
          />
        </label>
        <label htmlFor="password" className="block">
          Senha:
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded mt-1"
          />
        </label>
        <label htmlFor="cpf" className="block">
          CPF:
          <InputMask
            mask="999.999.999-99"
            value={formData.cpf}
            onChange={(e) => handleInputChange(e)}
          >
            {() => (
              <input
                type="text"
                id="cpf"
                name="cpf"
                placeholder="CPF"
                className="w-full px-3 py-2 border rounded mt-1"
              />
            )}
          </InputMask>
        </label>
        <label htmlFor="telephone" className="block">
          Telefone:
          <InputMask
            mask="(99) 99999-9999"
            value={formData.telephone}
            onChange={(e) => handleInputChange(e)}
          >
            {() => (
              <input
                type="text"
                id="telephone"
                name="telephone"
                placeholder="Telefone"
                className="w-full px-3 py-2 border rounded mt-1"
              />
            )}
          </InputMask>
        </label>
        <label htmlFor="table_number" className="block">
          Número da Mesa (Opcional):
          <input
            type="number"
            id="table_number"
            name="table_number"
            placeholder="Número da Mesa (Opcional)"
            value={formData.table_number}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded mt-1"
          />
        </label>
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
        onClose={() => {
          setModal({ ...modal, isVisible: false });
          if (createdUserSuccess) navigate('/login');
        }}
      />
    </div>
  );
};

export default UserCreate;
