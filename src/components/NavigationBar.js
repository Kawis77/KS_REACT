import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import '../styles/NavigationBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFileAlt, faUser, faCog } from '@fortawesome/free-solid-svg-icons';

function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg" className="navbar-custom">
         <Navbar.Brand href="#home">
        <FontAwesomeIcon icon={faHome} className="home-icon" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link href="#home">Raport</Nav.Link>
          <Nav.Link href="#home">Employers</Nav.Link>
          <Nav.Link href="#home">Planing</Nav.Link>
          <Nav.Link href="#home">Statistic</Nav.Link>
          <Nav.Link href="#link">Document</Nav.Link>
          <Nav.Link href="#link"></Nav.Link>
        </Nav>
        <Nav>
          <Nav.Item>
            <Nav.Link href="#"><i className="fa fa-user"></i></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#"><i className="fa fa-cog"></i></Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;