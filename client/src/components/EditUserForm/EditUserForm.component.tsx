import { useState } from "react";
import { UserFormData } from "~/types";

const EditUserForm: React.FC<{
  user: UserFormData;
  onCancel: () => void;
  onSave: (user: any) => void;
}> = ({ user, onCancel, onSave }) => {
  const [formData, setFormData] = useState<UserFormData>({ ...user });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Editar Usuário</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="Nome"
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="Sobrenome"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="Email"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-black px-4 py-2 rounded w-full mt-2"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
    };

export default EditUserForm;