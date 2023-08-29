import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UserPicker from '../../Application/components/dialogs/UserPicker';
import LocationPicker from '../../Application/components/dialogs/LocationPicker';
import CategoryPicker from '../../Application/components/dialogs/CategoryPicker';

const EditDocumentForm = ({ id }) => {
  const [document, setDocument] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tab1');
  const [editorData, setEditorData] = useState('');
  const [owner, setOwner] = useState(null);
  const [location, setLocation] = useState(null);
  const [category, setCategory] = useState(null);
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

  const handleUserSelected = (user) => {
    console.log('Selected user:', user);
    setOwner(user);
  };

  const handleLocationSelected = (location) => {
    console.log('Selected location:', location);
    setLocation(location);
  };

  const handleCategorySelected = (category) => {
    console.log('Selected category:', category);
    setCategory(category);
  };

  useEffect(() => {
    setLoading(true);
  
    axios
      .get(`http://localhost:8080/api/document/read/one/doc/${id}`)
      .then(response => {
       const fetchedDocument = response.data;
        setDocument(fetchedDocument);
        setLoading(false);
        setSummaryData({
          title: fetchedDocument.title,
          owner: fetchedDocument.owner.id,
          createDate: fetchedDocument.createDate,
          location: fetchedDocument.location.name,
          category: fetchedDocument.categoryEntity.name,
          version: fetchedDocument.version,
          publicationNote: fetchedDocument.publicationNote,
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
                <Form.Label>Wlasciciel</Form.Label>
                <UserPicker onUserSelected={handleUserSelected} defaultValue = {summaryData.owner} />
              </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formDate">
                  <Form.Label>Data wydania</Form.Label>
                  <Form.Control name='create-date' type="date" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formLocation">
                  <Form.Label>Lokacja</Form.Label>
                 <LocationPicker onLocationSelected={handleLocationSelected} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formCategory">
                  <Form.Label>Kategoria</Form.Label>
                  <CategoryPicker onCategorySelected={handleCategorySelected} />
                </Form.Group>
              </Col>
              <Col>
        <Form.Group controlId="formVersion">
          <Form.Label>Wersja</Form.Label>
          <Form.Control
            name="version"
            type="text"
            placeholder="Wersja dokumentu"
            value= {summaryData.version + 1} // Ustawia domyślną wartość 1
            readOnly 
          />
        </Form.Group>
      </Col>
            </Row>

            <Form.Group controlId="formPublicationNote">
              <Form.Label>Notka publikacji</Form.Label>
              <Form.Control name='publicationNote' as="textarea" rows={3} />
            </Form.Group>
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
                  <p><strong>Data wydania:</strong> {summaryData.createDate}</p>
          <p><strong>Lokacja:</strong> {summaryData.location}</p>
          <p><strong>Kategoria:</strong> {summaryData.categoryEntity}</p>
          <p><strong>Wersja:</strong> {summaryData.version}</p>
          <p><strong>Notka publikacji:</strong> {summaryData.publicationNote}</p>
                  
                </Col>
                <Col>
                  {/* <CKEditor editor={ClassicEditor} data={summaryData.content} readOnly={true} /> */}
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
