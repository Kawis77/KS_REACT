import React, { useState, useEffect } from 'react';
import DocumentNavigationBar from '../components/DocumentNavigationBar';
import Sidebar from '../components/Sidebar';
import { Table } from 'antd';
import './../../../src/Document/styles/DocumentList.css';
import { FileOutlined } from '@ant-design/icons';

function DocumentList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/document/read/all')
      .then(response => response.json())
      .then(data => setData(data));
      console.log();
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
      key: 'title'
    },
    {
      title: 'Wlasciciel',
      dataIndex: 'owner',
      key: 'owner',
      render: owner => owner.name + " "+ owner.surname
    },
    {
      title: 'Kategoria',
      dataIndex: 'categoryEntity',
      key: 'category',
      render: categoryEntity => categoryEntity.name
    },
    {
      title: 'Lokacja',
      dataIndex: 'location',
      key: 'location',
      render: categoryEntity => categoryEntity.name
    },
    {
      title: 'Wersja',
      dataIndex: 'version',
      key: 'version'
    },
    {
      title: 'Data dodania',
      dataIndex: 'createDate',
      key: 'createDate'
    }
  ];

  return (
    <div>
      {/* Załóżmy, że DocumentNavigationBar i Sidebar to osobne komponenty */}
      <DocumentNavigationBar />
      <Sidebar />
      <div className="table-container">
        <Table dataSource={data} columns={columns} />
      </div>
    </div>
  );
}

export default DocumentList;