import React from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useOutsideClick(onClose);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container" ref={modalRef}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button 
            onClick={onClose}
            className="modal-close"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;