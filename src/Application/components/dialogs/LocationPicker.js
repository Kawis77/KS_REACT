import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import '../../styles/dialogs/LocationPickerStyle.css';

const LocationPicker = ({ onLocationSelected , defaultValue}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocation] = useState(null);

  useEffect(() => {
    fetchLocations();
    if(defaultValue){
      const defaultLocation = locations.find(location => location.id === defaultValue)
      setSelectedLocation(defaultLocation);
    }
  }, [defaultValue]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/menu/component/all');
      const fetchedLocations = response.data;
      setLocations(fetchedLocations);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleLocationSelection = (location) => {
    setSelectedLocation(location);
  };

  const handleOkButtonClick = () => {
    onLocationSelected(selectedLocations);
    setModalIsOpen(false);
  };

  return (
    <>
      <Form.Control
        name="selectedLocation"
        type="text"
        value={selectedLocations ? selectedLocations.name : ''}
        onClick={() => setModalIsOpen(true)}
        readOnly
        placeholder="Wybierz lokacje"
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Wybierz lokacje"
        style={{
          content: {
            width: '640px',
            height: '440px',
            margin: 'auto',
            overflow: 'auto',
          },
        }}
      >
        <h2>Wybierz lokacje</h2>
        <ul>
          {locations.map((location) => (
            <li
              key={location.id}
              className={`location-item ${selectedLocations === location ? 'selected' : ''}`}
              onClick={() => handleLocationSelection(location)}
            >
             {`${location.name}`}
            </li>
          ))}
        </ul>
        <div className="buttons-container">
          <Button variant="primary" className="modal-button" onClick={handleOkButtonClick}>
            OK
          </Button>
          <Button
            variant="secondary"
            className="modal-button"
            onClick={() => setModalIsOpen(false)}
          >
            Anuluj
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default LocationPicker;
