import React from 'react';
import DocumentNavigationBar from '../components/DocumentNavigationBar';
import MainDocumentMenu from '../components/MainDocumentMenu';


function DocumentPage() {
  return (
    <div className='page-content'>
      <DocumentNavigationBar/>
    <MainDocumentMenu/>
    </div>
  );
}

export default DocumentPage;