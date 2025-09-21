//import logo from './logo.svg';
import './App.css';
import Main from './pages/Main.js';
import DBInfo from './pages/DBInfo.js';
import About from './pages/About.js';
import Test from './pages/Test.js';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/DBInfo" element={<DBInfo />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/Test" element={<Test />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
