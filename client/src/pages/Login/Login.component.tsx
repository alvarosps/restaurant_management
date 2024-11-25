import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '~components/Modal';
import { useAuth } from '~/context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modal, setModal] = useState({ isVisible: false, title: '', message: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Use the returned value from the login method
      const isAdmin = await login(email, password);

      console.log('isAdmin', isAdmin);
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
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
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-6 rounded shadow-md"
      >
        <label className="block mb-2">
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
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
