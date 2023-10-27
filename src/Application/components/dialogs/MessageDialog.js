import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';

const MessageDialog = ({ message}) => {
    const [isOpen, setIsOpen] = useState(true);

    const closeModal = () => {
        setIsOpen(false);
      };
    
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          width: '500px',
          height: '200px',
          margin: 'auto',
          overflow: 'auto',
          border: '1px solid black'
        },
      }}
    >
      <div className='confirm-message-dialog'>
        {message}
      </div>
      <div className="buttons-container">
        <Button
          variant="primary"
          className="modal-button"
          onClick={closeModal}>
          Ok
        </Button>
      </div>
    </Modal>
  );
}

export default MessageDialog;
