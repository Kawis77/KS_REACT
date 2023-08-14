import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './../../../src/Document/styles/OptionMenuDocument.css';
import { FileOutlined, EditOutlined, ExportOutlined, DeleteOutlined } from '@ant-design/icons'; // Importuj ikony


function OptionMenuDocument() {

  return (
    <div className="option-menu">
      <h4 className="option-menu-title">Zarzadzaj dokumentem</h4>
      <ul>
        <li>
          <NavLink to="/edit-document">
          <EditOutlined className="nav-icon" />
            Edytuj dokument</NavLink>
        </li>
        <li>
          <NavLink to="/move-document">
          <ExportOutlined className="nav-icon" /> {/* Dodaj ikonę po prawej stronie */}
            Przenies dokument</NavLink>
        </li>
        <li>
          <NavLink to="/delete-document">
          <DeleteOutlined className="nav-icon" /> {/* Dodaj ikonę po prawej stronie */}
            Usun dokument</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default OptionMenuDocument;