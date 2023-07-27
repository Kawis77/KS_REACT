import React from 'react';
import NavigationBar from "./Application/components/NavigationBar";
import './Application/styles/App.css';
import DocumentPage from "./Document/pages/DocumentPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Application/pages/Home";
import DocumentList from "./Document/pages/DocumentList";
import AddDocument from "./Document/pages/AddDocument";
import Login from "./Security/Login"; 

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
          <Route path="/login" element={<Login />} /> 
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
