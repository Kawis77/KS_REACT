import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
      width: '50%',
      margin: 'auto',
      padding: '20px',
    },
  };
  
  Modal.setAppElement('#root'); // Ustaw element aplikacji, do którego ma być przypięty dialog
  

const FieldsValidate = ({validateList}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };
  
    useEffect(() => {
      openModal(); // Automatycznie otwórz komponent po renderowaniu
    }, []);
  
    return (
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>Lista stringów</h2>
          <ul>
            {validateList.map((str, index) => (
              <li key={index}>{str}</li>
            ))}
          </ul>
          <button onClick={closeModal}>Zamknij</button>
        </Modal>
      </div>
    );
  }
    

export default FieldsValidate;