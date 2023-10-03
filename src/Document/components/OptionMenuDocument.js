import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './../../../src/Document/styles/OptionMenuDocument.css';
import { FileOutlined, EditOutlined, ExportOutlined, DeleteOutlined } from '@ant-design/icons'; // Importuj ikony


function OptionMenuDocument({id , type}) {

   console.log(type);
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
          <NavLink to="/delete-one-document">
          <DeleteOutlined className="nav-icon" /> 
            Usun dokument</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default OptionMenuDocument;