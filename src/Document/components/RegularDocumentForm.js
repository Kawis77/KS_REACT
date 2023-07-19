import React, { useState } from 'react';
import { Form, Button, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UserPicker from '../../Application/components/dialogs/UserPicker'; 
import axios from 'axios';

const RegularDocumentForm = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [editorData, setEditorData] = useState('');
  const [summaryData, setSummaryData] = useState({});


  const handleUserSelected = (user) => {
    // Tutaj możesz zaktualizować stan z informacjami o wybranym użytkowniku
    console.log('Wybrany użytkownik:', user);
  };

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
    if (selectedTab === 'tab4') {
      const formData = new FormData(document.getElementById('regular-document-form'));
      const newSummaryData = {
        title: formData.get('title'),
        author: formData.get('author'),
        createDate: formData.get('create-date'),
        location: formData.get('location'),
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
    const documentData = {
      title: formData.get('title'),
      author: formData.get('author'),
      createDate: formData.get('create-date'),
      location: formData.get('location'),
      category: formData.get('category'),
      version: formData.get('version'),
      publicationNote: formData.get('publicationNote'),
      content: editorData
    };

    try {
      const response = await axios.post('http://localhost:8080/api/document/regular/create', documentData);
      console.log(response.data);
      // Obsłuż odpowiedź z serwera, np. czyść formularz lub przekieruj na inną stronę
    } catch (error) {
      console.error(error);
      // Obsłuż błędy, np. wyświetl komunikat o błędzie
    }
  };

  const summaryTabContent = (documentData) => (
    <div>
      <Row>
        <Col>
          <p><strong>Tytuł:</strong> {documentData.title}</p>
          <p><strong>Autor:</strong> {documentData.author}</p>
          <p><strong>Data wydania:</strong> {documentData.createDate}</p>
          <p><strong>Lokacja:</strong> {documentData.location}</p>
          <p><strong>Kategoria:</strong> {documentData.category}</p>
          <p><strong>Wersja:</strong> {documentData.version}</p>
          <p><strong>Notka publikacji:</strong> {documentData.publicationNote}</p>
        </Col>
        <Col>
          <CKEditor
            editor={ClassicEditor}
            data={documentData.content}
            readOnly={true}
          />
        </Col>
      </Row>
    </div>
  );

  return (
    <div>
      <Form id='regular-document-form' onSubmit={handleSave}>
        <Tabs activeKey={activeTab} onSelect={handleSelect}>
          <Tab eventKey="tab1" title="Dane">
            <Row>
              <Col>
                <Form.Group controlId="formTitle">
                  <Form.Label>Tytuł dokumentu</Form.Label>
                  <Form.Control name='title' type="text" placeholder="Wpisz tytuł" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formAuthor">
                  <Form.Label>Autor</Form.Label>
                  <UserPicker onUserSelected={handleUserSelected} /> {/* Użycie komponentu UserPicker */}
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
                  <Form.Control name='location' type="text" placeholder='Ustaw lokacje' />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formType">
                  <Form.Label>Kategoria</Form.Label>
                  <Form.Control name='category' as="select">
                    <option>Kategortia1</option>
                    <option>Kategoria2</option>
                    <option>Kategoria3</option>
                    <option>Kategoria4</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formVersion">
                  <Form.Label>Wersja</Form.Label>
                  <Form.Control name='version' type="text" placeholder='Wersja dokumentu' />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formPublicationNote">
              <Form.Label>Notka publikacji</Form.Label>
              <Form.Control name='publicationNote' as="textarea" rows={3} />
            </Form.Group>
          </Tab>
          <Tab eventKey="tab2" title="Kontent">
            <CKEditor
              editor={ClassicEditor}
              data={editorData}
              onChange={onEditorChange}
            />
          </Tab>
          <Tab eventKey="tab3" title="Dostep">
          </Tab>
<Tab eventKey="tab4" title="Podsumowanie">
  <div>
    <Row>
      <Col>
        <p><strong>Tytuł:</strong> {summaryData.title}</p>
        <p><strong>Autor:</strong> {summaryData.author}</p>
        <p><strong>Data wydania:</strong> {summaryData.createDate}</p>
        <p><strong>Lokacja:</strong> {summaryData.location}</p>
        <p><strong>Kategoria:</strong> {summaryData.category}</p>
        <p><strong>Wersja:</strong> {summaryData.version}</p>
        <p><strong>Notka publikacji:</strong> {summaryData.publicationNote}</p>
      </Col>
      <Col>
        <CKEditor
          editor={ClassicEditor}
          data={summaryData.content}
          readOnly={true}
        />
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

export default RegularDocumentForm;