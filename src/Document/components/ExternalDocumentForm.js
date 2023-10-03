import React, {useEffect, useState } from 'react';
import { Form, Button, Row, Col, Tabs, Tab } from 'react-bootstrap';
import UserPicker from '../../Application/components/dialogs/UserPicker';
import axios from 'axios';
import LocationPicker from '../../Application/components/dialogs/LocationPicker';
import CategoryPicker from '../../Application/components/dialogs/CategoryPicker';
import './../../../src/Document/styles/DocumentForm.css';

const ExternalDocumentForm = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [editorData, setEditorData] = useState('');
  const [summaryData, setSummaryData] = useState({});
  const [owner, setOwner] = useState(null);
  const [location, setLocation] = useState(null);
  const [category, setCategory] = useState(null);
  const [path , setPath] = useState(null);

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
        version: '1',
        publicationNote: formData.get('publicationNote'),
        content: editorData

      };
      setSummaryData(newSummaryData);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('documentFile', formData.get('documentFile'));
    console.log(formData.get('documentFile'));
    const documentData = {
      title: formData.get('title'),
      owner: owner ? owner.id : null,
      createDate: formData.get('create-date'),
      location: location ? location.id : null,
      category: category ? category.id : null,
      version: '1',
      publicationNote: formData.get('publicationNote'),
      content: editorData,
      documentFile: formData.get('documentFile') // Dodaj przesyłany plik do documentData
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


  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Odczytaj zawartość pliku jako URL
      const fileURL = URL.createObjectURL(selectedFile);
      // Prześlij plik na serwer
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post('http://localhost:8080/api/file/save', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const uploadedFilePath = response.data;

       setPath(uploadedFilePath);
        const iframe = document.getElementById('file-content').querySelector('iframe');
        iframe.src = iframe.src;
      } catch (error) {
        console.error('Błąd przesyłania pliku na serwer', error);
      }
    }
  };

  return (
    <div>
      <Form id='external-document-form' onSubmit={handleSave}>
        <Tabs activeKey={activeTab} onSelect={handleSelect} className='nav-tabs'>
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
            <div className='container-fluid'>
              <Row>
                <div id='file-upload' class='col-6'>
                  <Form.Group controlId="formFile">
                    <Form.Label>Dołącz plik</Form.Label>
                    <Form.Control name="documentFile" type="file" onChange={handleFileChange} />
                  </Form.Group>
                </div>
                <div id='file-content' class='col-6'>
                  <iframe src={`http://localhost:8080/api/document/show/one/${path}`} width="100%" height="600" title="Dokument" />
                </div>
              </Row>
            </div>
          </Tab>
          <Tab eventKey="tab3" title="Dostep">
          </Tab>
          <Tab eventKey="tab4" title="Podsumowanie">

<div class="container-fluid">
  <Row>
    <div className='col-6' id='summary-view'>
      <p><strong>Tytuł:</strong> {summaryData.title}</p>
      <p><strong>Właściciel:</strong> {summaryData.owner}</p>
      <p><strong>Data wydania:</strong> {summaryData.createDate}</p>
      <p><strong>Lokacja:</strong> {summaryData.location}</p>
      <p><strong>Kategoria:</strong> {summaryData.category}</p>
      <p><strong>Wersja:</strong> {summaryData.version}</p>
      <p><strong>Notka publikacji:</strong> {summaryData.publicationNote}</p>
      <Button className="save-button" variant="primary" type="submit" >
        Zapisz
      </Button>
      <div id='file-view'>
      </div>
    </div>
    <div id='file-content' class='col-6'>
      <iframe src={`http://localhost:8080/api/document/show/one/${path}`} width="100%" height="600" title="Dokument" />
    </div>
  </Row>
</div>
</Tab>
        </Tabs>
      </Form>
    </div>
  );
};

export default ExternalDocumentForm;