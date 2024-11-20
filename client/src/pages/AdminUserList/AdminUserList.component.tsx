import React, { useEffect, useState } from 'react';
import { userAPI } from '~services/api';
import Modal from '~components/Modal';
import EditUserForm from '~/components/EditUserForm';

const AdminUserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [modal, setModal] = useState({ isVisible: false, title: '', message: '' });
  const [editingUser, setEditingUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userAPI.fetchAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user: any) => {
    setEditingUser(user);
  };

  const handleDelete = async (userId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await userAPI.deleteUser(userId);
        setUsers(users.filter((user) => user.id !== userId));
        setModal({ isVisible: true, title: 'Sucesso', message: 'Usuário excluído com sucesso!' });
      } catch (error) {
        setModal({ isVisible: true, title: 'Erro', message: 'Erro ao excluir o usuário.' });
      }
    }
  };

  const handleUpdate = async (updatedUser: any) => {
    try {
      await userAPI.updateUser(updatedUser.id, updatedUser);
      setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
      setEditingUser(null);
      setModal({ isVisible: true, title: 'Sucesso', message: 'Usuário atualizado com sucesso!' });
    } catch (error) {
      setModal({ isVisible: true, title: 'Erro', message: 'Erro ao atualizar o usuário.' });
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Usuários</h1>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nome</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.first_name} {user.last_name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-2 py-1 ml-2 rounded"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <EditUserForm
          user={editingUser}
          onCancel={() => setEditingUser(null)}
          onSave={handleUpdate}
        />
      )}

      <Modal
        title={modal.title}
        message={modal.message}
        isVisible={modal.isVisible}
        onClose={() => setModal({ ...modal, isVisible: false })}
      />
    </div>
  );
};

export default AdminUserList;
