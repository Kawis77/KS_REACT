import React, { useState, useEffect } from 'react';
import DocumentNavigationBar from '../components/DocumentNavigationBar';
import Sidebar from '../components/Sidebar';
import { Table } from 'antd';
import './../../../src/Document/styles/MenuDocumentList.css';
import { useParams } from 'react-router-dom';
import { FileOutlined } from '@ant-design/icons';

function MenuComponentDocumentList() {
  const [data, setData] = useState([]);
  const { id } = useParams();

 console.log(id);

 useEffect(() => {
    // Zostawiamy id jako string - nie potrzeba parsowania
    fetch(`http://localhost:8080/api/document/read/one/${id}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => {
        console.error('Błąd podczas pobierania danych:', error);
      });
  }, [id]);

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

export default MenuComponentDocumentList;