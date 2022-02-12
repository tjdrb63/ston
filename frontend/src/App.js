import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import MasterLayout from './layouts/MasterLayout';
import Login from './components/Login';
import Register from './components/Register';
import Board from './components/Board';
import axios from 'axios';
import BoardCopy from './components/BoardCopy';

axios.defaults.baseURL = "http://localhost:8000/"
axios.defaults.headers.post["Content-Type"] = 'application/json'
axios.defaults.headers.post["Accept"] = 'application/json'
axios.defaults.withCredentials = true;
function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
          <Route path="/" element={<MasterLayout />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/board" element={<BoardCopy/>}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
