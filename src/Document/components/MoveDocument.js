import React, { useState , useEffect } from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './../../../src/Document/styles/MoveDocument.css';

const MoveDocument = ({ id }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [documents, setDocuments] = useState(null);
    const [locations, setLocation] = useState(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/document/move/' + id);

                console.log(response.data)
                if(response.data.documents > 0){
                  alert("jest wieksze niz 0");
                 console.log(response.data.documents);
                }
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
              {Object.keys(documents).map((menuDocumentKey) => (
                <div key={menuDocumentKey}>
                  <h3>{menuDocumentKey}</h3>
                  <ul>
                    {documents[menuDocumentKey].map((document) => (
                      <li key={document.id}>
                        {document.title} - {document.location.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div id='right-files-container'>
              <h3>Locations</h3>
              <ul>
                {locations.map((location) => (
                  <li key={location.id}>
                    {location.name} - {location.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="buttons-container">
            {/* Przyciski */}
          </div>
        </Modal>
      );
                  }

export default MoveDocument;
