import React from 'react';
import DocumentNavigationBar from '../components/DocumentNavigationBar';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DocumentView from '../components/DocumentView';
import './../../../src/Document/styles/ShowDocument.css';
import OptionMenuDocument from '../components/OptionMenuDocument';

function ShowDocument() {
  const { id } = useParams();
  return (
    <div>
      <DocumentNavigationBar />
      <Sidebar />
      <div className="show-document-content">
        <DocumentView id={id} />
      </div>
      <OptionMenuDocument/>
    </div>
  );
}

export default ShowDocument;
