import React from 'react';

const Modal = ({ title, content, onClose }) => (
  <div className="popup">
    <div className="overlay" onClick={onClose}></div>
    <div className="content">
      <div className="close-btn" onClick={onClose}>&times;</div>
      <h2 className="submain__title">{title}</h2>
      <p className="modal-content">{content}</p>
    </div>
  </div>
);

export default Modal;