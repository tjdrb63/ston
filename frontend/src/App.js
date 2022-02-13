import React,{useEffect, useState, Suspense} from 'react'
import {BrowserRouter as Router ,Route,Switch , Redirect} from 'react-router-dom';
import MasterLayout from './layouts/MasterLayout';
import Login from './components/Login';
import Register from './components/Register';
import axios from 'axios';
import Home from './layouts/Home';
import Sidebar from './layouts/Sidebar'
import Empty from './components/Empty'
import Navbar from './layouts/Navbar'
import { useSelector ,useDispatch} from 'react-redux';
import { getUser } from './store/actions';
import Board from './components/BoardCopy'


axios.defaults.baseURL = "http://localhost:8000/"
axios.defaults.headers.post["Content-Type"] = 'application/json'
axios.defaults.headers.post["Accept"] = 'application/json'
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  const token = localStorage.getItem("auth_token");
  const dispatch = useDispatch();
  if(!token) {
    
  } else {
    axios.get('/api/user').then(res=> {
      dispatch(getUser(res.data))
      console.log("user 정보 받아옴")
    }).catch(err=> {
      alert(err);
    })
  }
  return (
    <Router>
        <div className="flex w-full">
  
          <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/board" component={Board}></Route>
          <Route path="*" component={Empty}></Route>
          </Switch>
        </div>

        </Router>

  );
}

export default App;
