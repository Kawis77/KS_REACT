import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import UserPicker from '../../Application/components/dialogs/UserPicker';
import LocationPicker from '../../Application/components/dialogs/LocationPicker';
import CategoryPicker from '../../Application/components/dialogs/CategoryPicker';
import './../../../src/Document/styles/DocumentForm.css';
import FieldsValidate from '../../Application/components/dialogs/FieldsValidate';
import EmptyFieldWarning from '../../Application/components/fields/EmptyFieldWarning';
import MessageDialog from '../../Application/components/dialogs/MessageDialog';

const EditExternalDocumentForm = ({ id }) => {
  const [documentt, setDocument] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tab1');
  const [editorData, setEditorData] = useState('');
  const [owner, setOwner] = useState(null);
  const [location, setLocation] = useState(null);
  const [category, setCategory] = useState(null);
  const [summaryEditData, setSummaryEditData] = useState({});
  const [showValidationErrorModal, setShowValidationErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
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
    setOwner(user);
  };

  const handleLocationSelected = (location) => {
    setLocation(location);
  };

  const handleCategorySelected = (category) => {
    setCategory(category);
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
      title: summaryEditData.title.trim() === '' ? null : summaryEditData.title,
      owner: owner ? owner.id : summaryEditData.ownerID,
      createDate: summaryData.createDate.trim() === '' ? null : summaryData.createDate,
      location: location ? location.id : summaryEditData.locationID,
      category: category ? category.id : summaryEditData.categoryID,
      version: summaryEditData.version,
      publicationNote: summaryEditData.publicationNote.trim() === '' ? null : summaryData.publicationNote,
      content: editorData,
      documentFile: formData.get('documentFile') // Dodaj przesyłany plik do documentData
    };
    let response = null;
    try {
      response = await axios.post('http://localhost:8080/api/document/external/update', documentData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ustaw odpowiedni nagłówek dla przesyłania plików
        },
      });
      debugger;
      setShowSuccessModal(true);

    } catch (error) {
      debugger;
      if (Array.isArray(response.data)) {
        setValidationErrors(response.data);
        setShowValidationErrorModal(true);
      }else{
      console.error(error);
      }
    }
  };

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
    if (selectedTab === 'tab4') {
      const formData = new FormData(document.getElementById('external-document-form'));
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
        setSummaryData({
          ...summaryData,
          path: uploadedFilePath, // Ustaw ścieżkę przesłanego pliku w stanie
        });
        const iframe = document.getElementById('file-content').querySelector('iframe');
        iframe.src = iframe.src;
      } catch (error) {
        console.error('Błąd przesyłania pliku na serwer', error);
      }
    }
  };

  return (
    <div>
      <Form id="external-document-form" onSubmit={handleSave}>
        <Tabs activeKey={activeTab} onSelect={handleSelect} className="nav-tabs">
          <Tab eventKey="tab1" title="Dane">
            <Row>
            <Col>
                <Form.Group controlId="formTitle">
                  <Form.Label>Tytuł dokumentu</Form.Label>
                  <Form.Control id='title-id' name="title" type="text" placeholder="Wpisz tytuł" defaultValue={summaryData.title} onChange={(e) => setSummaryData({ ...summaryData, title: e.target.value })} />
                  <EmptyFieldWarning name="title-id" value={summaryData.title} />
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
                  <Form.Control id='create-date-id' name='create-date' type="date" defaultValue={summaryData.createDate} onChange={(e) => setSummaryData({ ...summaryData, createDate: e.target.value })} />
                  <EmptyFieldWarning name="create-date-id" value={summaryData.createDate} />
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
              <Form.Control id='publication-note-id' name='publicationNote' as="textarea" rows={3} defaultValue={summaryData.publicationNote} onChange={(e) => setSummaryData({ ...summaryData, publicationNote: e.target.value })}  />
              <EmptyFieldWarning name="publication-note-id" value={summaryData.publicationNote} />
            </Form.Group>
          </Tab>
          <Tab eventKey="tab2" title="Kontent">
            <div class="container-fluid">
              <Row>
                <div id='file-upload' class='col-6'>
                  <Form.Group controlId="formFile">
                    <Form.Label>Dołącz plik</Form.Label>
                    <Form.Control name="documentFile" type="file" onChange={handleFileChange} />
                  </Form.Group>
                </div>
                <div id='file-content' class='col-6'>
                  <iframe src={`http://localhost:8080/api/document/show/one/${summaryData.path}`} width="100%" height="600" title="Dokument" />
                </div>
              </Row>
            </div>
          </Tab>
          <Tab eventKey="tab3" title="Dostęp">
            {/* Content of the Access tab */}
          </Tab>
          <Tab eventKey="tab4" title="Podsumowanie">

            <div class="container-fluid">
              <Row>
                <div className='col-6' id='summary-view'>
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
                  <div id='file-view'>
                  </div>
                </div>
                <div id='file-content' class='col-6'>
                  <iframe src={`http://localhost:8080/api/document/show/one/${summaryData.path}`} width="100%" height="600" title="Dokument" />
                </div>
              </Row>
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
           {showSuccessModal && (
        <MessageDialog message="Edycja dokumentu przebiegła pomyślnie" />
      )}
    </div>
  );
};

export default EditExternalDocumentForm;
