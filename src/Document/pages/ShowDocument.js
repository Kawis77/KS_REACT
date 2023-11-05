import DocumentNavigationBar from '../components/DocumentNavigationBar';
import { useParams } from 'react-router-dom';
import MainDocumentMenu from '../components/MainDocumentMenu';
import DocumentView from '../components/DocumentView';
import './../../../src/Document/styles/ShowDocument.css';
import OptionMenuDocument from '../components/OptionMenuDocument';

function ShowDocument() {
  const { id , type } = useParams();
  return (
    <div>
      <DocumentNavigationBar />
      <MainDocumentMenu />
      <div className="show-document-content">
        <DocumentView id={id} />
        <OptionMenuDocument id={id} type={type} /> {/* Poprawione przekazanie id */}
      </div>
    </div>
  );
}

export default ShowDocument;
