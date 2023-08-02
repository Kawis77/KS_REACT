import React from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import '../../styles/dialogs/DocumentType.css';
import { FileOutlined, UploadOutlined } from '@ant-design/icons';

function DocumentType({ onTypeSelected }) {

  const handleOkButtonClick = () => {
    onTypeSelected();
  };

  const handleRegularDocumentClick = () => {

  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={handleOkButtonClick}
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
        <li className="location-item" onClick={handleRegularDocumentClick}>
          <FileOutlined style={{ marginRight: '10px' }} />
          Dokument regularny
        </li>
        <li className="location-item">
          <UploadOutlined style={{ marginRight: '10px' }} />
          Dokument zewnętrzny
        </li>
      </ul>
      <div className="buttons-container">
        <Button variant="primary" className="modal-button" onClick={handleOkButtonClick}>
          OK
        </Button>
        <Button variant="secondary" className="modal-button" onClick={handleOkButtonClick}>
          Anuluj
        </Button>
      </div>
    </Modal>
  );
}

export default DocumentType;
