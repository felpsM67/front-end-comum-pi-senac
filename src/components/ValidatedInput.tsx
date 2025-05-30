import React from 'react';

interface ValidatedInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="w-full mb-4">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded ${
          error
            ? 'border-red-500'
            : value
              ? 'border-blue-500'
              : 'border-gray-300'
        }`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default ValidatedInput;
