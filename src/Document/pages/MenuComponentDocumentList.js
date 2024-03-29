import React, { useState, useEffect } from 'react';
import DocumentNavigationBar from '../components/DocumentNavigationBar';
import MainDocumentMenu from '../components/MainDocumentMenu';
import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import './../../../src/Document/styles/MenuDocumentList.css';
import { useParams } from 'react-router-dom';
import { FileOutlined } from '@ant-design/icons';

function MenuComponentDocumentList() {

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const { id } = useParams();

 console.log(id);

 useEffect(() => {
    fetch(`http://localhost:8080/api/document/read/menu/${id}`)
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
      <DocumentNavigationBar />
      <MainDocumentMenu />
      <div className="table-container">
        <Table
          dataSource={data}
          columns={columns}
          onRow={(record) => ({
            onDoubleClick: () => {
              navigate(`/show-document/${record.id}`); // Zmień ścieżkę na '/document/:id'
            },
          })}
        />
      </div>
    </div>
  );
}


export default MenuComponentDocumentList;