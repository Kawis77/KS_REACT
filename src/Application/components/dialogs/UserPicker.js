import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Form } from 'react-bootstrap';
import '../../styles/UserPicker.css';

const UserPicker = ({ onUserSelected }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    const exampleUsers = [
      { id: 1, name: 'Jan Kowalski' },
      { id: 2, name: 'Anna Nowak' },
      { id: 3, name: 'Piotr Zieliński' },
    ];

    setUsers(exampleUsers);
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
        name="selectedUser"
        type="text"
        value={selectedUser ? selectedUser.name : ''}
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
            height: '640px',
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
              {user.name}
            </li>
          ))}
        </ul>
        <div className="buttons-container">
          <button className="modal-button" onClick={handleOkButtonClick}>
            OK
          </button>
          <button
            className="modal-button"
            onClick={() => setModalIsOpen(false)}
          >
            Anuluj
          </button>
        </div>
      </Modal>
    </>
  );
};

export default UserPicker;
