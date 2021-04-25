import './App.css';

import React, {useState} from 'react';
import Auth from '../../components/auth';
import EventList from '../../components/eventList';
import Header from '../../components/header';
import Register from '../../components/register';
import AddEvent from '../../components/addEvent';

import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const App = () => {
  const [, rerender] = useState(null);
  
  const setToken = (token) => {
    localStorage.setItem('token', token);
    updateScreen();
  }
  const updateScreen = () => {
    rerender(Math.random());
  }
  
  return (
    <Router>
        <Switch>
            <Route exact path="/">
              <Auth setToken={setToken}>
                <Header setToken={setToken}/>
                <EventList  updateScreen={updateScreen}/>
                <AddEvent updateScreen={updateScreen}/>
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
