import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import UserPicker from '../../Application/components/dialogs/UserPicker';
import LocationPicker from '../../Application/components/dialogs/LocationPicker';
import CategoryPicker from '../../Application/components/dialogs/CategoryPicker';
import './../../../src/Document/styles/DocumentForm.css';

const EditRegularDocumentForm = ({ id }) => {
  const [documentt, setDocument] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tab1');
  const [editorData, setEditorData] = useState('');
  const [owner, setOwner] = useState(null);
  const [location, setLocation] = useState(null);
  const [category, setCategory] = useState(null);
  const [summaryEditData, setSummaryEditData] = useState({});
  const [summaryData, setSummaryData] = useState({

    title: '',
    owner: '',
    ownerName: '',
    createDate: '',
    location: '',
    locationID: '',
    categoryID: '',
    category: '',
    version: '',
    publicationNote: '',
    path: '',
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

  const onEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };
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
          ownerName: fetchedDocument.owner.name,
          createDate: fetchedDocument.createDate,
          location: fetchedDocument.location.name,
          locationID: fetchedDocument.location.id,
          category: fetchedDocument.categoryEntity.name,
          categoryID: fetchedDocument.categoryEntity.id,
          version: fetchedDocument.version,
          publicationNote: fetchedDocument.publicationNote,
          path: fetchedDocument.path
        });
        console.log(summaryData);
      })

      .catch(error => {
        console.error('Problem with getting documents from the backend', error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    console.log(summaryData); // To pokaże zaktualizowane dane
  }, [summaryData]);

  const handleSave = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('documentFile', formData.get('documentFile'));
    const documentData = {
      id: id,
      title: summaryEditData.title,
      owner: owner ? owner.id : summaryEditData.ownerID,
      createDate: summaryData.createDate,
      location: location ? location.id : summaryEditData.locationID,
      category: category ? category.id : summaryEditData.categoryID,
      version: summaryEditData.version,
      publicationNote: summaryEditData.publicationNote,
      content: editorData,
      documentFile: formData.get('documentFile') // Dodaj przesyłany plik do documentData
    };
    try {
      console.log(documentData);
      const response = await axios.post('http://localhost:8080/api/document/external/update', documentData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ustaw odpowiedni nagłówek dla przesyłania plików
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
    if (selectedTab === 'tab4') {
      const formData = new FormData(document.getElementById('regular-document-form'));
      const newSummaryData = {
        title: formData.get('title'),
        owner: summaryData.ownerName ? summaryData.ownerName : null,
        ownerID: summaryData.owner ? summaryData.owner : null,
        createDate: formData.get('create-date'),
        location: summaryData.location ? summaryData.location : null,
        locationID: summaryData.locationID ? summaryData.locationID : null,
        category: summaryData.category ? summaryData.category : null,
        categoryID: summaryData.categoryID ? summaryData.categoryID : null,
        type: formData.get('category'),
        version: formData.get('version'),
        publicationNote: formData.get('publicationNote'),
        content: editorData

      };
      setSummaryEditData(newSummaryData);
    }
  };

  return (
    <div>
      <Form id="regular-document-form" onSubmit={handleSave}>
        <Tabs activeKey={activeTab} onSelect={handleSelect} className="nav-tabs">
          <Tab eventKey="tab1" title="Dane">
            <Row>
              <Col>
                <Form.Group controlId="formTitle">
                  <Form.Label>Tytuł dokumentu</Form.Label>
                  <Form.Control name="title" type="text" placeholder="Wpisz tytuł" defaultValue={summaryData.title} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formOwner">
                  <Form.Label>Wlasciciel</Form.Label>
                  <UserPicker onUserSelected={handleUserSelected} defaultValue={summaryData.owner} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formDate">
                  <Form.Label>Data wydania</Form.Label>
                  <Form.Control name='create-date' type="date" defaultValue={summaryData.createDate} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formLocation">
                  <Form.Label>Lokacja</Form.Label>
                  <LocationPicker onLocationSelected={handleLocationSelected} defaultValue={summaryData.locationID} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formCategory">
                  <Form.Label>Kategoria</Form.Label>
                  <CategoryPicker onCategorySelected={handleCategorySelected} defaultValue={summaryData.categoryID} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formVersion">
                  <Form.Label>Wersja</Form.Label>
                  <Form.Control
                    name="version"
                    type="text"
                    placeholder="Wersja dokumentu"
                    value={summaryData.version + 1} // Ustawia domyślną wartość 1
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formPublicationNote">
              <Form.Label>Notka publikacji</Form.Label>
              <Form.Control name='publicationNote' as="textarea" rows={3} defaultValue={summaryData.publicationNote} />
            </Form.Group>
          </Tab>
          <Tab eventKey="tab2" title="Kontent">
            <CKEditor
              editor={ClassicEditor}
              data={editorData}
              onChange={onEditorChange}
            />
          </Tab>
          <Tab eventKey="tab3" title="Dostęp">
            {/* Content of the Access tab */}
          </Tab>
          <Tab eventKey="tab4" title="Podsumowanie">
              <Row>
                <Col>
                  <p><strong>Tytuł:</strong> {summaryEditData.title}</p>
                  <p><strong>Właściciel:</strong> {summaryEditData.owner}</p>
                  <p><strong>Data wydania:</strong> {summaryEditData.createDate}</p>
                  <p><strong>Lokacja:</strong> {summaryEditData.location}</p>
                  <p><strong>Kategoria:</strong> {summaryEditData.category}</p>
                  <p><strong>Wersja:</strong> {summaryEditData.version}</p>
                  <p><strong>Notka publikacji:</strong> {summaryEditData.publicationNote}</p>
                  <Button className="save-button" variant="primary" type="submit" >
                    Zapisz
                  </Button>
                  </Col>
                  <Col>
                  <CKEditor
          editor={ClassicEditor}
          data={summaryData.content}
          readOnly={true}
        />
                  
                  </Col>
              </Row>

          </Tab>
        </Tabs>
      </Form>
    </div>
  );
};

export default EditRegularDocumentForm;
