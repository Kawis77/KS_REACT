import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './../../../src/Document/styles/OptionMenuDocument.css';
import { FileOutlined, EditOutlined, ExportOutlined, DeleteOutlined } from '@ant-design/icons'; 
import axios from 'axios';


function OptionMenuDocument({id , type}) {

  const [showDeleteDocument] = useState(false); // Stan do zarządzania widocznością komponentu DocumentType

  function handleDeleteDocument() {
  
  }


  return (
    <div className="option-menu">
      <h4 className="option-menu-title">Zarzadzaj dokumentem</h4>
      <ul>
        <li>
        <NavLink to={`/edit-one-document/${id}/${type}`}>
          <EditOutlined className="nav-icon" />
            Edytuj dokument</NavLink>
        </li>
        <li>
          <NavLink to="/move-one-document">
          <ExportOutlined className="nav-icon" /> 
            Przenies dokument</NavLink>
        </li>
        <li>
          <NavLink onClick={handleDeleteDocument}>
          <DeleteOutlined className="nav-icon" /> 
            Usun dokument</NavLink>
        </li>
     
      </ul>
    </div>
  );
}

export default OptionMenuDocument;