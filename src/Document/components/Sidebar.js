import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './../../../src/Document/styles/Sidebar.css';
import DocumentType from '../../Application/components/dialogs/DocumentType';

function Sidebar() {
  const [showDocumentType, setShowDocumentType] = useState(false); // Stan do zarządzania widocznością komponentu DocumentType

  const handleOpenDocumentType = () => {
    setShowDocumentType(true);
  };

  const handleCloseDocumentType = () => {
    setShowDocumentType(false);
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <ul>
        {/* Dodajemy onClick do NavLink, aby otworzyć komponent DocumentType */}
        <li>
          <NavLink onClick={handleOpenDocumentType}>Dodaj dokument</NavLink>
        </li>
        <li>
          <NavLink to="/document-list">Lista dokumentów</NavLink>
        </li>
        <li>
          <NavLink to="/edit-document">Edytuj dokument</NavLink>
        </li>
        <li>
          <NavLink to="/move-document">Przenies dokument</NavLink>
        </li>
      </ul>
      <h2 className="sidebar-title">Options</h2>
      <ul>
        <li>
          <NavLink to="/document-converter">Konwerter</NavLink>
        </li>
        <li>
          <NavLink to="/document-template">Szablon</NavLink>
        </li>
        <li>
          <NavLink to="/document-settings">Ustawienia</NavLink>
        </li>
      </ul>

      {/* Renderujemy komponent DocumentType warunkowo na podstawie stanu showDocumentType */}
      {showDocumentType && <DocumentType onTypeSelected={handleCloseDocumentType} />}
    </div>
  );
}

export default Sidebar;
