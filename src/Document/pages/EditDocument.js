import React from 'react';
import DocumentNavigationBar from '../components/DocumentNavigationBar';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import EditDocumentForm from '../components/EditDocumentForm';

function EditDocument(


) {
  const { id } = useParams();
  alert(id);
  return (
  
    <div>
      <DocumentNavigationBar />
      <Sidebar />
      <div className="add-form-content">
        <h1>Edytuj dokument</h1>
        <EditDocumentForm id={id}/>
      </div>
    </div>
  );
}

export default EditDocument;