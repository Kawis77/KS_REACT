import React from 'react';
import DocumentNavigationBar from '../components/DocumentNavigationBar';
import MainDocumentMenu from '../components/MainDocumentMenu';
import RegularDocumentForm from '../components/RegularDocumentForm';
import './../../../src/Document/styles/DocumentForm.css';

function AddDocument() {
  return (
    <div>
      <DocumentNavigationBar />
      <MainDocumentMenu />
      <div className="add-form-content">
        <h1>Dodaj nowy dokument</h1>
        <RegularDocumentForm />
      </div>
    </div>
  );
}

export default AddDocument;