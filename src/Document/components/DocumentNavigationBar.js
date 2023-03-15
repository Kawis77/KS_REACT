import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './../../../src/Document/styles/DocumentNavigationBar.css';

function DocumentNavigationBar() {
  return (
    <Navbar bg="light" expand="lg" className="navbar-document">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link href="#home">Logistyka dokumenty</Nav.Link>
          <Nav.Link href="#home">Transport dokumenty</Nav.Link>
          <Nav.Link href="#home">Faktury</Nav.Link>
          <Nav.Link href="#home">Wydatki</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default DocumentNavigationBar;