import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './../../../src/Document/styles/OptionMenuDocument.css';
import { FileOutlined, EditOutlined, ExportOutlined, DeleteOutlined } from '@ant-design/icons'; 
import axios from 'axios';
import AcceptOrCancelDialog from '../../Application/components/dialogs/AcceptOrCancelDialog';


function OptionMenuDocument({id , type}) {

  const [showDeleteDocument , setShowDeleteDocument] = useState(false); // Stan do zarządzania widocznością komponentu DocumentType

  function handleDeleteDocument() {
    setShowDeleteDocument(true);
  }


  const fetchData = async () => {
    try {
      const response = await axios.delete('http://localhost:8080/api/document/delete/' + id);
      // Otrzymujesz dane z odpowiedzi
      console.log(response.data);
    } catch (error) {
      // Obsługa błędów
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