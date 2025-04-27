import React from 'react';
import PropTypes from 'prop-types';
import { useToast } from '../../contexts/ToastContext';
import './Toast.css';

const Toast = ({ id, message, type, onClose }) => {
  // Icons for each toast type
  const icons = {
    info: <i className="fas fa-info-circle toast-icon"></i>,
    success: <i className="fas fa-check-circle toast-icon"></i>,
    warning: <i className="fas fa-exclamation-triangle toast-icon"></i>,
    error: <i className="fas fa-times-circle toast-icon"></i>
  };

  const handleClick = () => {
    onClose(id);
  };

  return (
    <div className={`toast toast-${type}`} onClick={handleClick}>
      {icons[type]}
      <span className="toast-message">{message}</span>
      <div className="toast-progress"></div>
    </div>
  );
};

Toast.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  onClose: PropTypes.func.isRequired
};

Toast.defaultProps = {
  type: 'info'
};

export default Toast;