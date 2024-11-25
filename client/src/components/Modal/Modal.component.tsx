interface ModalProps {
    title: string;
    message?: string;
    isVisible: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const Modal = ({ title, message, isVisible, onClose, children }: ModalProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black w-11/12 sm:w-10/12 max-w-md p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4 text-center">{title}</h2>
        {message && <p className="mb-4 text-center">{message}</p>}
        {children}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;
