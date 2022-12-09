import './App.css';
import Home from "./components/Home";
import Login from "./components/Login";
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
     <Navbar />
      <Router>
       <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        </Routes>
        
    </Router>
    </div>
  );
}

export default App;