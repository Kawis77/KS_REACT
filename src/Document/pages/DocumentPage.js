import React from 'react';
import DocumentNavigationBar from '../components/DocumentNavigationBar';
import Sidebar from '../components/Sidebar';


function DocumentPage() {
  return (
    <div className='page-content'>
      <DocumentNavigationBar/>
    <Sidebar/>
    </div>
  );
}

export default DocumentPage;