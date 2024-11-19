import React from 'react';
import InputMask from 'react-input-mask';

interface CPFInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CPFInput: React.FC<CPFInputProps> = ({ value, onChange }) => {
  return (
    <InputMask
      mask="999.999.999-99"
      value={value}
      onChange={onChange}
      placeholder="CPF"
      className="border rounded px-2 py-1"
    >
      {(inputProps) => <input {...inputProps} />}
    </InputMask>
  );
};

export default CPFInput;
