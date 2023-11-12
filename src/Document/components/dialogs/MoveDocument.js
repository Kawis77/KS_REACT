import React, { useState , useEffect } from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const MoveDocument = ({ id }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [documents, setDocuments] = useState(null);
    const [locations, setLocation] = useState(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/document/move/' + id);
                console.log(response.data.documents);
                console.log(response.data.locations);
                setDocuments(response.data.documents);
                setLocation(response.data.locations);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDocuments();
    }, [id]); 
    const closeModal = () => {
        setIsOpen(false);
      };
    
      const acceptAction = () => {
        setIsOpen(false);
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
          height: '500px',
          margin: 'auto',
          overflow: 'auto',
          border: '1px solid black'
        },
      }}
    >
      <div className='move-document-dialog'>
    
    <div id='left-files-container'>
       
    </div>
    <div id='right-files-container'>
      


    </div>
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

export default MoveDocument;
