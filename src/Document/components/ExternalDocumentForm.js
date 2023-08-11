import React, { useState } from 'react';
import { Form, Button, Row, Col, Tabs, Tab } from 'react-bootstrap';
import UserPicker from '../../Application/components/dialogs/UserPicker'; 
import axios from 'axios';
import LocationPicker from '../../Application/components/dialogs/LocationPicker';
import CategoryPicker from '../../Application/components/dialogs/CategoryPicker';

const ExternalDocumentForm = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [editorData, setEditorData] = useState('');
  const [summaryData, setSummaryData] = useState({});
  const [owner, setOwner] = useState(null);
  const [location, setLocation] = useState(null);
  const [category, setCategory] = useState(null);

  const handleUserSelected = (user) => {
    console.log(user);
    setOwner(user);
  };

  const handleLocationSelected = (location) => {
    console.log(location);
    setLocation(location);
  };

  const handleCategorySelected = (category) => {
     console.log(category);
    setCategory(category);
  };

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
    if (selectedTab === 'tab4') {
      const formData = new FormData(document.getElementById('external-document-form'));
      const newSummaryData = {
        title: formData.get('title'),
        owner: owner ? owner.name : null,
        createDate: formData.get('create-date'),
        location: location ? location.name : null,
        category: category ? category.name : null,
        type: formData.get('category'),
        version: formData.get('version'),
        publicationNote: formData.get('publicationNote'),
        content: editorData
        
      };
      setSummaryData(newSummaryData);
    }
  };

  const onEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('documentFile', formData.get('documentFile'));
    const documentData = {
      title: formData.get('title'),
      owner: owner ? owner.id : null,
      createDate: formData.get('create-date'),
      location: location ? location.id : null,
      category: category ? category.id : null,
      version: '1',
      publicationNote: formData.get('publicationNote'),
      content: editorData
    };

    try {
        const response = await axios.post('http://localhost:8080/api/document/external/create', documentData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Ustaw odpowiedni nagłówek dla przesyłania plików
          },
        });
      } catch (error) {
        console.error(error);
      }
    };

  const summaryTabContent = (documentData) => (
    <div>
      <Row>
        <Col>
          <p><strong>Tytuł:</strong> {documentData.title}</p>
          <p><strong>Wlasciciel:</strong> {documentData.owner}</p>
          <p><strong>Data wydania:</strong> {documentData.createDate}</p>
          <p><strong>Lokacja:</strong> {documentData.location}</p>
          <p><strong>Kategoria:</strong> {documentData.category}</p>
          <p><strong>Wersja:</strong> {documentData.version}</p>
          <p><strong>Notka publikacji:</strong> {documentData.publicationNote}</p>
        </Col>
      </Row>
    </div>
  );

  return (
    <div>
       <Form id='external-document-form' onSubmit={handleSave}>
        <Tabs activeKey={activeTab} onSelect={handleSelect} variant='pils'>
          <Tab eventKey="tab1" title="Dane">
            <Row>
              <Col>
                <Form.Group controlId="formTitle">
                  <Form.Label>Tytuł dokumentu</Form.Label>
                  <Form.Control name='title' type="text" placeholder="Wpisz tytuł" />
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="formOwner">
                <Form.Label>Wlasciciel</Form.Label>
                <UserPicker onUserSelected={handleUserSelected} />
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
            value="1" // Ustawia domyślną wartość 1
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
 <Row>
   <Col>
    <Form.Group controlId="formFile">
    <Form.Label>Dołącz plik</Form.Label>
    <Form.Text>Dodaj plik tutaj.</Form.Text> {/* Opis dodany na górze */}
      <Form.Control name="documentFile" type="file" />
    </Form.Group>
  </Col>
</Row>
 </Tab>
          <Tab eventKey="tab3" title="Dostep">
          </Tab>
<Tab eventKey="tab4" title="Podsumowanie">
  <div>
    <Row>
      <Col>
        <p><strong>Tytuł:</strong> {summaryData.title}</p>
        <p><strong>Wlasciciel:</strong> {summaryData.owner}</p>
        <p><strong>Data wydania:</strong> {summaryData.createDate}</p>
        <p><strong>Lokacja:</strong> {summaryData.location}</p>
        <p><strong>Kategoria:</strong> {summaryData.category}</p>
        <p><strong>Wersja:</strong> {summaryData.version}</p>
        <p><strong>Notka publikacji:</strong> {summaryData.publicationNote}</p>
      </Col>
    </Row>
    <Button className='save-button' variant="primary" type="submit">
      Zapisz
    </Button>
  </div>
</Tab>
        </Tabs>
      </Form>
    </div>
  );
};

export default ExternalDocumentForm;