import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './../../../src/Document/styles/MoveDocument.css';

const MoveDocument = ({ id }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [documents, setDocuments] = useState(null);
  const [locations, setLocations] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/document/move/${id}`);
        setDocuments(response.data.documents);
        setLocations(response.data.locations);
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

  const handleDocumentClick = (document) => {
    if (selectedDocument && selectedDocument.id === document.id) {
      setSelectedDocument(null);
    } else {
      setSelectedDocument(document);
    }
  };

  const handleLocationClick = (location) => {
    if (selectedLocation && selectedLocation.id === location.id) {
      setSelectedLocation(null);
    } else {
      setSelectedLocation(location);
    }
  };

  const isDocumentSelected = (document) => {
    return selectedDocument && selectedDocument.id === document.id;
  };

  const isLocationSelected = (location) => {
    return selectedLocation && selectedLocation.id === location.id;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          width: '800px',
          height: '500px',
          margin: 'auto',
          overflow: 'auto',
          border: '1px solid black'
        },
      }}
    >
      <div className='move-document-dialog'>
        <div id='left-files-container'>
          <h1>Documents</h1>
          <ul>
            {documents &&
              documents.map((document) => (
                <li
                  key={document.id}
                  className={isDocumentSelected(document) ? 'selected' : ''}
                  onClick={() => handleDocumentClick(document)}
                >
                  {document.name}
                </li>
              ))}
          </ul>
        </div>
        <div id='right-files-container'>
          <h1>Locations</h1>
          <ul>
            {locations &&
              locations.map((location) => (
                <li
                  key={location.id}
                  className={isLocationSelected(location) ? 'selected' : ''}
                  onClick={() => handleLocationClick(location)}
                >
                  {location.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="buttons-container">
        <Button onClick={closeModal}>Cancel</Button>
        <Button onClick={acceptAction}>Accept</Button>
      </div>
    </Modal>
  );
};

export default MoveDocument;
