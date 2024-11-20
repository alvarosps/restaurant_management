interface ModalProps {
    title: string;
    message: string;
    isVisible: boolean;
    onClose: () => void;
    children?: React.ReactNode; // Permite receber filhos
}

const Modal: React.FC<ModalProps> = ({ title, message, isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-4 max-w-sm w-full">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="mb-4">{message}</p>
        {children}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-2"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;
