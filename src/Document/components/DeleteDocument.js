import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import './../../../src/Document/styles/DocumentType.css';
import { FileOutlined, UploadOutlined } from '@ant-design/icons';

function DeleteDocument({ onTypeSelected }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOkButtonClick = () => {
    onTypeSelected();
    if (selectedOption === 'Dokument regularny') {
      window.location.href = '/add-document';
    }
    if(selectedOption === "Dokument zewnętrzny") {
      window.location.href = '/add-external-document'
    }
  
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const isOptionSelected = (option) => selectedOption === option;
  const optionClassName = (option) => isOptionSelected(option) ? 'location-item selected' : 'location-item';

  return (
    <Modal
      isOpen={true}
      onRequestClose={onTypeSelected}
      contentLabel="Wybierz typ dokumentu"
      style={{
        content: {
          width: '440px',
          height: '340px',
          margin: 'auto',
          overflow: 'auto',
        },
      }}
    >
      <h2>Wybierz kategorie</h2>
      <ul className="location-list">
        <li className={optionClassName('Dokument regularny')} onClick={() => handleOptionClick('Dokument regularny')}>
          <FileOutlined style={{ marginRight: '10px' }} />
          Dokument regularny
        </li>
        <li className={optionClassName('Dokument zewnętrzny')} onClick={() => handleOptionClick('Dokument zewnętrzny')}>
          <UploadOutlined style={{ marginRight: '10px' }} />
          Dokument zewnętrzny
        </li>
      </ul>
      <div className="buttons-container">
        <Button variant="primary" className="modal-button" onClick={handleOkButtonClick}>
          OK
        </Button>
        <Button variant="secondary" className="modal-button" onClick={onTypeSelected}>
          Anuluj
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteDocument;
