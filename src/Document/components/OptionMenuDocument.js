import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './../../../src/Document/styles/OptionMenuDocument.css';
import { FileOutlined, EditOutlined, ExportOutlined, DeleteOutlined } from '@ant-design/icons'; 
import axios from 'axios';
import AcceptOrCancelDialog from '../../Application/components/dialogs/AcceptOrCancelDialog';
import MoveDocument from './MoveDocument';


function OptionMenuDocument({id , type}) {

  const [showDeleteDocument , setShowDeleteDocument] = useState(false);
  const [showMoveDocument , setShowMoveDocument] = useState(false);

  function handleDeleteDocument() {
    setShowDeleteDocument(true);
  }

  function handleMoveDocument() {
    setShowMoveDocument(true);
  }

  const fetchData = async () => {
    try {
      const response = await axios.delete('http://localhost:8080/api/document/delete/' + id);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
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
          <NavLink onClick={handleMoveDocument}>
          <ExportOutlined className="nav-icon" /> 
            Przenies dokument</NavLink>
        </li>
        <li>
          <NavLink onClick={handleDeleteDocument}>
          <DeleteOutlined className="nav-icon" /> 
            Usun dokument</NavLink>
        </li>
      </ul>


      {showMoveDocument && (
        <MoveDocument
        id={id}/>
      )}

      {showDeleteDocument && (
        <AcceptOrCancelDialog
          message="Czy na pewno chcesz usunąć ten dokument?"
          action={fetchData}
          url={"/document-list"}
        />
      )}
    </div>
  );
}

export default OptionMenuDocument;