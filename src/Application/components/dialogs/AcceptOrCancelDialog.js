import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AcceptOrCancelDialog = ({ message , action , url }) => {
    const [isOpen, setIsOpen] = useState(true);

const navigate = useNavigate();


    const closeModal = () => {
        setIsOpen(false);
      };
    

      const acceptAction = () => {
        action();
        setIsOpen(false);
        navigate(url);
      }

      const cancelAction = () => {
        setIsOpen(false);
        return
      }
  

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
          onClick={acceptAction}>
          Ok
        </Button>

        <Button
          variant="primary"
          className="modal-button"
          onClick={cancelAction}>
          Anuluj
        </Button>
      </div>
    </Modal>
  );
}

export default AcceptOrCancelDialog;
