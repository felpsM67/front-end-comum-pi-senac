import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Snackbar({
  message,
  type = 'success', // Valor padrão definido aqui
  duration = 10000, // Valor padrão definido aqui
  onClose = null, // Valor padrão definido aqui
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);

      // Oculta o snackbar após o tempo definido
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [message, duration, onClose]);

  if (!visible) return null;

  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-500 text-white',
  };

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg ${typeStyles[type]} transition-opacity duration-300`}
    >
      {message}
    </div>
  );
}

Snackbar.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  duration: PropTypes.number,
  onClose: PropTypes.func,
};

Snackbar.defaultProps = {
  type: 'success',
  duration: 10000,
  onClose: null,
};
