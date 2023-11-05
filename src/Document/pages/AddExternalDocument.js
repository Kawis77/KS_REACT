import React from 'react';
import DocumentNavigationBar from '../components/DocumentNavigationBar';
import MainDocumentMenu from '../components/MainDocumentMenu';
import ExternalDocumentForm from '../components/ExternalDocumentForm';
import './../../../src/Document/styles/DocumentForm.css';

function AddExternalDocument() {
  return (
    <div>
      <DocumentNavigationBar />
      <MainDocumentMenu />
      <div className="add-form-content">
        <h1>Dodaj nowy dokument zewnetrzny</h1>
        <ExternalDocumentForm/>
      </div>
    </div>
  );
}

export default AddExternalDocument;