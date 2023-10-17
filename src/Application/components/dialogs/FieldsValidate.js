import React from 'react';
import Modal from 'react-modal';

const FieldsValidate = ({ isOpen, onRequestClose, validationErrors }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      // Dodaj odpowiednie style dla modala
      style={{
        content: {
          height: '30%',
          width: '50%',
          margin: 'auto',
          padding: '20px',
        },
      }}
      contentLabel="Validation Errors Modal"
    >
      <h2>Błędy walidacji</h2>
      {/* Wyświetlenie błędów */}
      <ul>
        {validationErrors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
      <button onClick={onRequestClose}>Zamknij</button>
    </Modal>
  );
};

export default FieldsValidate;
