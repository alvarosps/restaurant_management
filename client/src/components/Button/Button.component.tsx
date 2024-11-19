import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, className }) => (
  <button
    className={`px-4 py-2 text-sm sm:text-base rounded ${
      disabled
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-blue-500 text-white hover:bg-blue-700'
    } ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

export default Button;
