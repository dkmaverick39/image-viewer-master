import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './screens/header/Header';
import Login from './screens/login/Login';
import Home from './screens/home/Home';
import Profile from './screens/profile/Profile';
import {BrowserRouter as Router,Route,Link,NavLink} from 'react-router-dom';

ReactDOM.render(
    <Router>
 
         <Route path="/home" component={Home}></Route>
         <Route path="/profile" component={Profile}></Route> 
         <Route path="/login" component={Login}></Route> 
         <Route path="/logout" component={Login}></Route> 
         <Route exact path="/" component={Login}></Route>  
    </Router>, 
    document.getElementById('root')
);
