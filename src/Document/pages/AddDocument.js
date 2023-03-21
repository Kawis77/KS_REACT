import React from 'react';
import DocumentNavigationBar from '../components/DocumentNavigationBar';
import Sidebar from '../components/Sidebar';
import RegularDocumentForm from '../components/RegularDocumentForm';
import './../../../src/Document/styles/AddDocument.css';

function AddDocument() {
  return (
    <div>
      <DocumentNavigationBar />
      <Sidebar />
      <div className="add-form-content">
        <h1>Dodaj nowy dokument</h1>
        <RegularDocumentForm />
      </div>
    </div>
  );
}

export default AddDocument;