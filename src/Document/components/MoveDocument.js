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
  const [selectedObject, setSelectedObject] = useState(null);
  const [isChildDocumentsVisible, setIsChildDocumentsVisible] = useState(true);


  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/document/select/move/${id}`);

        console.log(response.data.document);

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
    const documentId = selectedDocument.id;
    const componentId = selectedLocation.id;

      try {
        const response = axios.post(`http://localhost:8080/api/document/change/move/${documentId}/${componentId}`);
      } catch (error) {
        console.log(error);
      }
  
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

  const handleObjectClick = (object) => {
    if (selectedObject === object) {
      setIsChildDocumentsVisible(!isChildDocumentsVisible);
    } else {
      setSelectedObject(object);
      setIsChildDocumentsVisible(true);
    }
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
        <h1>Objects</h1>
        <ul>
          {documents &&
            documents.map((object) => (
              <li
                key={object.id}
                onClick={() => handleObjectClick(object)}
              >
                {object.name}
                {(selectedObject === object && isChildDocumentsVisible && object.documents) && (
                  <ul>
                    {object.documents.map((document) => (
                      <li key={document.id} onClick={() => handleDocumentClick(document)} className={isDocumentSelected(document) ? 'selected' : ''}>
                        {document.title}
                        {/* Tutaj możesz wyświetlić więcej informacji na temat dokumentu */}
                      </li>
                    ))}
                  </ul>
                )}
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
