import React, { useState } from 'react';
import api from '~services/api';
import { useNavigate } from 'react-router-dom';
import Modal from '~components/Modal';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modal, setModal] = useState({ isVisible: false, title: '', message: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post('token/', { username, password });
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setModal({
        isVisible: true,
        title: 'Erro',
        message: 'Usuário ou senha inválidos.',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <div className="w-full max-w-sm bg-white p-6 rounded shadow-md">
        <label className="block mb-2">
          Usuário:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded mt-1"
          />
        </label>
        <label className="block mb-4">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded mt-1"
          />
        </label>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full mt-2 bg-gray-200 text-blue-600 px-4 py-2 rounded hover:bg-gray-300"
        >
          Voltar ao Menu
        </button>
        <button
          onClick={() => navigate('/user-create')}
          className="w-full mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Criar Conta
        </button>
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

export default Login;
