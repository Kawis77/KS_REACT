import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditDocumentForm = ({ id }) => {
  const [document, setDocument] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tab1');
  const [editorData, setEditorData] = useState('');
  const [summaryData, setSummaryData] = useState({
    title: '',
    owner: '',
    createDate: '',
    location: '',
    category: '',
    version: '',
    publicationNote: '',
    content: '',
  });
  useEffect(() => {
    setLoading(true);
  
    axios
      .get(`http://localhost:8080/api/document/read/one/doc/${id}`)
      .then(response => {
        const fetchedDocument = response.data;
        console.log(fetchedDocument);
        setDocument(fetchedDocument);
        setLoading(false);
        setSummaryData({
          title: fetchedDocument.title,
          owner: fetchedDocument.owner.id,
          createDate: fetchedDocument.createDate,
          location: fetchedDocument.location.name,
          category: fetchedDocument.category.name,
          version: fetchedDocument.version,
          publicationNote: fetchedDocument.publicationNote,
          content: fetchedDocument.content,
        });
      })
      .catch(error => {
        console.error('Problem with getting documents from the backend', error);
        setLoading(false);
      });
  }, [id]);
  
  useEffect(() => {
    console.log(summaryData); // To pokaże zaktualizowane dane
  }, [summaryData]);
  

  const handleSave = e => {
    e.preventDefault();
    // Form submission logic
  };

  const handleSelect = key => {
    setActiveTab(key);
  };

  return (
    <div>
      <Form id="regular-document-form" onSubmit={handleSave}>
        <Tabs activeKey={activeTab} onSelect={handleSelect}>
          <Tab eventKey="tab1" title="Dane">
            <Row>
              <Col>
                <Form.Group controlId="formTitle">
                  <Form.Label>Tytuł dokumentu</Form.Label>
                  <Form.Control name="title" type="text" placeholder="Wpisz tytuł" value={summaryData.title} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formOwner">
                  <Form.Label>Właściciel</Form.Label>
                  {/* Add UserPicker component */}
                </Form.Group>
              </Col>
            </Row>
            {/* Other form fields */}
          </Tab>
          <Tab eventKey="tab2" title="Kontent">
            <CKEditor editor={ClassicEditor} data={editorData} onChange={setEditorData} />
          </Tab>
          <Tab eventKey="tab3" title="Dostęp">
            {/* Content of the Access tab */}
          </Tab>
          <Tab eventKey="tab4" title="Podsumowanie">
            <div>
              <Row>
                <Col>
                  <p><strong>Tytuł:</strong> {summaryData.title}</p>
                  <p><strong>Właściciel:</strong> {summaryData.owner}</p>
                  {/* Other summary fields */}
                </Col>
                <Col>
                  <CKEditor editor={ClassicEditor} data={summaryData.content} readOnly={true} />
                </Col>
              </Row>
              <Button className="save-button" variant="primary" type="submit">
                Zapisz
              </Button>
            </div>
          </Tab>
        </Tabs>
      </Form>
    </div>
  );
};

export default EditDocumentForm;
