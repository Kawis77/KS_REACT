import React from 'react';
import DocumentNavigationBar from '../components/DocumentNavigationBar';
import { useParams } from 'react-router-dom';
import MainDocumentMenu from '../components/MainDocumentMenu';
import EditRegularlDocumentForm from '../components/EditRegularDocumentForm';
import EditExternalDocumentForm from '../components/EditExternalDocumentForm';

function EditDocument(
) {
  const { id , type } = useParams();
  if(type === '1'){
  return (
    <div>
      <DocumentNavigationBar />
      <MainDocumentMenu />
      <div className="add-form-content">
        <h1>Edytuj dokument</h1>
        <EditRegularlDocumentForm id={id}/>
      </div>
    </div>
  );
  }else{
    return(
<div>
      <DocumentNavigationBar />
      <MainDocumentMenu />
      <div className="add-form-content">
        <h1>Edytuj dokument</h1>
        <EditExternalDocumentForm id={id}/>
      </div>
    </div>
    );
  }
}

export default EditDocument;