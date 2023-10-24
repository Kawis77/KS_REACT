import React, { useState } from 'react';
import { Form, Button, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UserPicker from '../../Application/components/dialogs/UserPicker'; 
import axios from 'axios';
import LocationPicker from '../../Application/components/dialogs/LocationPicker';
import CategoryPicker from '../../Application/components/dialogs/CategoryPicker';
import './../../../src/Document/styles/DocumentForm.css';
import FieldsValidate from '../../Application/components/dialogs/FieldsValidate';
import EmptyFieldWarning from '../../Application/components/fields/EmptyFieldWarning';



const RegularDocumentForm = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [editorData, setEditorData] = useState('');
  const [summaryData, setSummaryData] = useState({});
  const [owner, setOwner] = useState(null);
  const [location, setLocation] = useState(null);
  const [category, setCategory] = useState(null);

  const [showValidationErrorModal, setShowValidationErrorModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  const handleUserSelected = (user) => {
    setOwner(user);
    setSummaryData({ ...summaryData, owner: user.name })
  };

  const handleLocationSelected = (location) => {
    setLocation(location);
    setSummaryData({ ...summaryData, location: location.name })
  };

  const handleCategorySelected = (category) => {
    setCategory(category);
    setSummaryData({ ...summaryData, category: category.name })
  };

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
    if (selectedTab === 'tab4') {
      const formData = new FormData(document.getElementById('regular-document-form'));
      const newSummaryData = {
        title: formData.get('title'),
        owner: owner ? owner.name : null,
        createDate: formData.get('create-date'),
        location: location ? location.name : null,
        category: category ? category.name : null,
        type: formData.get('category'),
        version: formData.get('version'),
        publicationNote: formData.get('publicationNote'),
        content: editorData,
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
      title: formData.get('title').trim() === '' ? null : formData.get('title'),
      owner: owner ? owner.id : null,
      createDate: formData.get('create-date').trim() === '' ? null : formData.get('create-date'),
      location: location ? location.id : null,
      category: category ? category.id : null,
      version: '1',
      publicationNote: formData.get('publicationNote').trim() === '' ? null : formData.get('publicationNote'),
      content: editorData
    };

    const response = null;
    try {
      response = await axios.post('http://localhost:8080/api/document/regular/create', documentData);
      console.log(response);
    
  
    } catch (error) {
      if (Array.isArray(response.data)) {
        setValidationErrors(response.data);
        setShowValidationErrorModal(true);
      }else{
      console.error(error);
      }
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
        <Tabs activeKey={activeTab} onSelect={handleSelect} className='nav-tabs'>
          <Tab eventKey="tab1" title="Dane">
            <Row>
              <Col>
                <Form.Group controlId="formTitle">
                  <Form.Label>Tytuł dokumentu</Form.Label>
                  <Form.Control id='title-id' name='title' type="text" placeholder="Wpisz tytuł" onChange={(e) => setSummaryData({ ...summaryData, title: e.target.value })} 
  />
  <EmptyFieldWarning name="title-id" value={summaryData.title} />
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="formOwner">
                <Form.Label>Wlasciciel</Form.Label>
                <UserPicker  onUserSelected={handleUserSelected} fieldId="owner-id" />
  <EmptyFieldWarning name="owner-id" value={summaryData.owner} />
              </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formDate">
                  <Form.Label>Data wydania</Form.Label>
                  <Form.Control id='create-date-id' name='create-date' type="date" onChange={(e) => setSummaryData({ ...summaryData, createDate: e.target.value })} />
                  <EmptyFieldWarning name="create-date-id" value={summaryData.createDate} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formLocation">
                  <Form.Label>Lokacja</Form.Label>
                 <LocationPicker onLocationSelected={handleLocationSelected} fieldId='location-id' />
                 <EmptyFieldWarning name="location-id" value={summaryData.location} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formCategory">
                  <Form.Label>Kategoria</Form.Label>
                  <CategoryPicker onCategorySelected={handleCategorySelected} fieldId='category-id' />
                  <EmptyFieldWarning name="category-id" value={summaryData.category} />
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
              <Form.Control id='publication-note-id' name='publicationNote' as="textarea" rows={3} onChange={(e) => setSummaryData({ ...summaryData, publicationNote: e.target.value })}  />
              <EmptyFieldWarning name="publication-note-id" value={summaryData.publicationNote} />
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
        <p><strong>Wlasciciel:</strong> {summaryData.owner}</p>
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
      {showValidationErrorModal && (
        <FieldsValidate
          isOpen={showValidationErrorModal}
          onRequestClose={() => setShowValidationErrorModal(false)}
          validationErrors={validationErrors}
        />
      )}
    </div>
  );
};

export default RegularDocumentForm;