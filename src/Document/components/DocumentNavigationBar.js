import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import axios from 'axios';
import './../../../src/Document/styles/DocumentNavigationBar.css';
import { Link } from 'react-router-dom'; // Dodaj ten import

Modal.setAppElement('#root');

function DocumentNavigationBar() {
  const [showModal, setShowModal] = useState(false);
  const [componentName, setComponentName] = useState('');
  const [componentDescription, setComponentDescription] = useState('');
  const [menuNames, setMenuNames] = useState([]);

  const handleAddComponent = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOK = () => {
    // Przetwarzanie danych z formularza
    console.log('Nazwa:', componentName);
    console.log('Opis:', componentDescription);

    // Wysyłanie danych za pomocą Axios
    axios.post('http://localhost:8080/api/menu/component/create', {
      name: componentName,
      description: componentDescription,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('Odpowiedź z serwera:', response.data);
      })
      .catch(error => {
        console.error('Błąd podczas wysyłania danych:', error);
      });

    handleCloseModal();
  };

  useEffect(() => {
    fetchMenuNames();
  }, []);

  const fetchMenuNames = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/menu/component/all');
      setMenuNames(response.data); // Przechowujemy pełne obiekty (zawierające nazwę i id) w tablicy menuNames
    } catch (error) {
      console.error('Błąd podczas pobierania nazw menu:', error);
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="navbar-document">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto justify-content-center">
           {menuNames.map((item) => (
    <Nav.Link key={item.id} href={`/menu/${item.id}`}>{item.name}</Nav.Link>
     ))}
          </Nav>
          <Nav>
            <Nav.Link onClick={handleAddComponent} href="#add-document">
              <FaPlus />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal className="custom-modal" isOpen={showModal} onRequestClose={handleCloseModal}>
        <h2>Dodaj komponent</h2>
        <Form>
          <Form.Group>
            <Form.Label>Nazwa:</Form.Label>
            <Form.Control
              type="text"
              value={componentName}
              onChange={(event) => setComponentName(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Opis:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={componentDescription}
              onChange={(event) => setComponentDescription(event.target.value)}
            />
          </Form.Group>
        </Form>
        <div className="buttons-container">
          <Button variant="secondary" onClick={handleCloseModal}>Zamknij</Button>
          <Button variant="primary" onClick={handleOK}>OK</Button>
        </div>
      </Modal>
    </>
  );
}

export default DocumentNavigationBar;
