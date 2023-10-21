import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import '../../styles/dialogs/CategoryPickerStyle.css';

const CategoryPicker = ({onCategorySelected , defaultValue , fieldId}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categories, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategory();
    if(defaultValue){
      const defaultCategory = categories.find(category => category.id === defaultValue)
      setSelectedCategory(defaultCategory);
    }
  }, [defaultValue]);

  const fetchCategory = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/category/read/all');
      const fetchedCategory = response.data;
      setCategory(fetchedCategory);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  const handleOkButtonClick = () => {
    onCategorySelected(selectedCategory);
    setModalIsOpen(false);
  };

  return (
    <>
      <Form.Control
      id={fieldId}
        name="selectedCategory"
        type="text"
        value={selectedCategory ? selectedCategory.name : ''}
        onClick={() => setModalIsOpen(true)}
        readOnly
        placeholder="Wybierz kategorie"
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Wybierz kategorie"
        style={{
          content: {
            width: '640px',
            height: '440px',
            margin: 'auto',
            overflow: 'auto',
          },
        }}
      >
        <h2>Wybierz kategorie</h2>
        <ul>
          {categories.map((categories) => (
            <li
              key={categories.id}
              className={`category-item ${selectedCategory === categories ? 'selected' : ''}`}
              onClick={() => handleCategorySelection(categories)}
            >
             {`${categories.name}`}
            </li>
          ))}
        </ul>
        <div className="buttons-container">
          <Button variant="primary" className="modal-button" onClick={handleOkButtonClick}>
            OK
          </Button>
          <Button
            variant="secondary"
            className="modal-button"
            onClick={() => setModalIsOpen(false)}
          >
            Anuluj
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CategoryPicker;
