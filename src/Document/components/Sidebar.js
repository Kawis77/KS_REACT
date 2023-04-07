import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import './../../../src/Document/styles/Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className='sidebar-title'>Menu</h2>
      <ul>
        <li><NavLink to="/add-document">Dodaj dokument</NavLink></li>
        <li><NavLink to="/document-list">Lista dokumentów</NavLink></li>
        <li><NavLink to="/edit-document">Edytuj dokument</NavLink></li>
        <li><NavLink to="/move-document">Przenies dokument</NavLink></li>
      </ul>
      <h2 className='sidebar-title'>Options</h2>
      <ul>      <li><NavLink to="/document-converter">Konwerter</NavLink></li>
      <li><NavLink to="/document-template">Szablon</NavLink></li>
      <li><NavLink to="/document-settings">Ustawienia</NavLink></li>
      </ul>

    </div>
  );
}

export default Sidebar;