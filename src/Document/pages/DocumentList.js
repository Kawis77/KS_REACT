import React, { useState, useEffect } from 'react';
import DocumentNavigationBar from '../components/DocumentNavigationBar';
import Sidebar from '../components/Sidebar';
import { Table } from 'antd';
import './../../../src/Document/styles/DocumentList.css';

function DocumentList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/document/read/all')
      .then(response => response.json())
      .then(data => setData(data));
      console.log(data);
  }, []);

  const columns = [
    {
      title: 'Nazwa',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Wlasciciel',
      dataIndex: 'owner',
      key: 'owner'
    },
    {
      title: 'Kategoria',
      dataIndex: 'category',
      key: 'category'
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