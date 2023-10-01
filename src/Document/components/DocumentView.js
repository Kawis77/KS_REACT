import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import './../../../src/Document/styles/DocumentView.css';

const DocumentView = ({ id }) => {
  const [document, setDocument] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios.get(`http://localhost:8080/api/document/read/one/doc/${id}`)
      .then(response => {
        setDocument(response.data);
        setLoading(false);
        console.log(document);
      })
      .catch(error => {
        console.error('Problem with getting documents from the backend', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Ładowanie dokumentów...</p>;
  }

  return (
    <div>
      <div className="document-container">
        <Container>
          <Row>
            <Col md={4}>
              <div className="document-column">
                <p className="document-info">Nazwa: {document.title}</p>
                <p className="document-info">Lokalizacja: {document.location.name}</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="document-column">
                <p className="document-info">Data utworzenia: {document.createDate}</p>
                <p className="document-info">Wersja: {document.version}</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="document-column">
                <p className="document-info">Notatka publikacyjna: {document.publicationNote}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
   <div className="document-view">
   <iframe src={`http://localhost:8080/api/document/show/one/${document.path}`} width="100%" height="800" title="Dokument" />
   </div>
    </div>
  );
};
export default DocumentView;
