import './App.css';

import React, {useState} from 'react';
import Auth from '../../components/auth';
import EventList from '../../components/eventList';
import Header from '../../components/header';
import Register from '../../components/register';

import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const App = () => {
  const [, rerender] = useState(null);
  
  const setToken = (token) => {
    localStorage.setItem('token', token);
    rerender(Math.random());
  }
  
  return (
    <Router>
        <Switch>
            <Route exact path="/">
            <Auth setToken={setToken}>
              <Header setToken={setToken}/>
              <EventList/>
            </Auth> 
            </Route>
            <Route path="/register">
                <Register />
            </Route>
        </Switch>
    </Router>
    
  );
}

export default App;
