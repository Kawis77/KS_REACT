import React, { useState } from 'react';
import { Tab, Tabs, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function RegularDocumentForm() {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleSave = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    try {
      console.log(formData);
      const response = await axios.post('http://localhost:8080/api/document/create', formData);
      if (response.status === 200) {
        // success logic
        console.log('Document created successfully');
      } else {
        // failure logic
        console.error('Document creation failed');
      }
    } catch (error) {
      // error handling
      console.error(error);
    }
  };

// ...

const [editorState, setEditorState] = useState(EditorState.createEmpty());

// ...

const onEditorStateChange = (newEditorState) => {
  setEditorState(newEditorState);
};

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  }

  return (
    <div>
      <Tabs activeKey={activeTab} onSelect={handleSelect}>
        <Tab eventKey="tab1" title="Dane">
          <Form onSubmit={handleSave}>
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
                  <Form.Control name='author' type="text" placeholder="Wpisz autora" />
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
                  <Form.Control name='type' as="select">
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

            <Button className='save-button' variant="primary" type="submit">
              Zapisz
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="tab2" title="Zakładka 2">
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'remove', 'history'],
              inline: { options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'] },
              list: { options:['unordered', 'ordered', 'indent', 'outdent'] },
            }}
          />
        </Tab>
      </Tabs>
    </div>
  );
}

export default RegularDocumentForm;