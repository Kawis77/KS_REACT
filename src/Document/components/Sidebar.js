import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import './../../../src/Document/styles/Sidebar.css';
import DocumentList from '../pages/DocumentList';
import AddDocument from '../pages/AddDocument';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li><NavLink to="/add-document">Dodaj dokument</NavLink></li>
        <li><NavLink to="/document-list">Lista dokumentów</NavLink></li>
      </ul>

    </div>
  );
}

export default Sidebar;