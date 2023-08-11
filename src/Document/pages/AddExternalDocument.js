import React from 'react';
import DocumentNavigationBar from '../components/DocumentNavigationBar';
import Sidebar from '../components/Sidebar';
import ExternalDocumentForm from '../components/ExternalDocumentForm';
import './../../../src/Document/styles/AddDocument.css';

function AddExternalDocument() {
  return (
    <div>
      <DocumentNavigationBar />
      <Sidebar />
      <div className="add-form-content">
        <h1>Dodaj nowy dokument zewnetrzny</h1>
        <ExternalDocumentForm/>
      </div>
    </div>
  );
}

export default AddExternalDocument;