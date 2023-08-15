import React from 'react';
import NavigationBar from "./Application/components/NavigationBar";
import './Application/styles/App.css';
import DocumentPage from "./Document/pages/DocumentPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Application/pages/Home";
import DocumentList from "./Document/pages/DocumentList";
import AddDocument from "./Document/pages/AddDocument";
import MenuComponentDocumentList from './Document/pages/MenuComponentDocumentList';
import Login from "./Security/Login.js"; 
import AddExternalDocument from './Document/pages/AddExternalDocument';
import ShowDocument from './Document/pages/ShowDocument';
import EditDocument from './Document/pages/EditDocument';

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavigationBar />
        <hr className="my-4" />
        <div className="container">
        </div>

        <Routes>
          <Route path="/document" element={<DocumentPage />} />
          <Route path="/document-list" element={<DocumentList />} />
          <Route path="/add-document" element={<AddDocument />} />
          <Route path='/add-external-document' element={<AddExternalDocument/>} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/" element={<Home />} />
          <Route path="/menu/:id" element={<MenuComponentDocumentList />} />
          <Route path="/edit-one-document/:id" element={<EditDocument/>} />
          <Route path="/show-document/:id" element={<ShowDocument />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
