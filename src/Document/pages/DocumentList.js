import React, { useState, useEffect } from 'react';
import DocumentNavigationBar from '../components/DocumentNavigationBar';
import Sidebar from '../components/Sidebar';
import { Table } from 'antd';
import './../../../src/Document/styles/DocumentList.css';

function DocumentList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/documents')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category'
    }
  ];

  return (
    <div>
      <DocumentNavigationBar />
      <Sidebar />
      <div className="table-container">
        <Table dataSource={data} columns={columns} />
      </div>
    </div>
  );
}

export default DocumentList;