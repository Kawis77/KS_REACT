import NavigationBar from "./Application/components/NavigationBar";
import './Application/styles/App.css';
import DocumentPage from "./Document/pages/DocumentPage"; // importujesz nowy plik
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Application/pages/Home";

function App() {
  return (
    <BrowserRouter>
          <div>
        <NavigationBar />
        <hr className="my-4" />
        <div className="container">
        </div>

        <Routes>
        <Route path="/document" Component={DocumentPage}/>
        <Route path="/" Component={Home}/>

          </Routes>


      </div>
    
    
    </BrowserRouter>

  );
}

export default App;