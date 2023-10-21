import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import '../../styles/dialogs/UserPickerStyle.css';

const UserPicker = ({ onUserSelected, defaultValue , fieldId}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
    if (defaultValue) {
      const defaultUser = users.find(user => user.id === defaultValue);
      setSelectedUser(defaultUser);
    }
  }, [defaultValue]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/read/all');
      const fetchedUsers = response.data;
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
  };

  const handleOkButtonClick = () => {
    onUserSelected(selectedUser);
    setModalIsOpen(false);
  };

  return (
    <>
      <Form.Control
        id={fieldId}
        name="selectedUser"
        type="text"
        value={selectedUser ? `${selectedUser.name} ${selectedUser.surname}` : ''}
        onClick={() => setModalIsOpen(true)}
        readOnly
        placeholder="Wybierz użytkownika"
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Wybierz użytkownika"
        style={{
          content: {
            width: '640px',
            height: '440px',
            margin: 'auto',
            overflow: 'auto',
          },
        }}
      >
        <h2>Wybierz użytkownika</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className={`user-item ${selectedUser === user ? 'selected' : ''}`}
              onClick={() => handleUserSelection(user)}
            >
             {`${user.name} ${user.surname}`}
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

export default UserPicker;
