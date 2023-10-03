import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DocumentNavigationBar from '../components/DocumentNavigationBar';
import Sidebar from '../components/Sidebar';
import { Table } from 'antd';
import './../../../src/Document/styles/DocumentList.css';
import { FileOutlined } from '@ant-design/icons';

function DocumentList() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/document/read/all')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const columns = [
    {
      title: '',
      dataIndex: '',
      key: '',
      render: () => (
        <span style={{ fontSize: '24px' }}>
          <FileOutlined />
        </span>
      ),
    },
    {
      title: 'Nazwa',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Wlasciciel',
      dataIndex: 'owner',
      key: 'owner',
      render: owner => owner.name + ' ' + owner.surname,
    },
    {
      title: 'Kategoria',
      dataIndex: 'categoryEntity',
      key: 'category',
      render: categoryEntity => categoryEntity.name,
    },
    {
      title: 'Lokacja',
      dataIndex: 'location',
      key: 'location',
      render: categoryEntity => categoryEntity.name,
    },
    {
      title: 'Wersja',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: 'Data dodania',
      dataIndex: 'createDate',
      key: 'createDate',
    },
  ];

  return (
    <div>
      <DocumentNavigationBar />
      <Sidebar />
      <div className="table-container">
        <Table
          dataSource={data}
          columns={columns}
          onRow={(record) => ({
            onDoubleClick: () => {
              navigate(`/show-document/${record.id}/${record.type}`); // Zmień ścieżkę na '/document/:id'
            },
          })}
        />
      </div>
    </div>
  );
}

export default DocumentList;
