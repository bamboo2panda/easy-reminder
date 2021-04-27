import './App.css';

import React, {useState} from 'react';
import Auth from '../../components/auth';
import EventList from '../../components/eventList';
import Header from '../../components/header';
import Register from '../../components/register';
import AddEvent from '../../components/addEvent';
import EditEvent from '../../components/editEvent';
import EventService from '../../services/eventService';

import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const App = () => {
  const [, rerender] = useState(null);
  const [eventList, updateEventList] = useState([]);
  const [editEvent, updateEditEvent] = useState([]);
  const [editModalShow, updateEditModalShow] = useState(false);
    
  const eventService = new EventService();
  
  eventService.getEventsList()
    .then((result) => {
        if (JSON.stringify(result) !== JSON.stringify(eventList)){
            updateEventList(result);
        }
    });
  

  const setToken = (token) => {
    localStorage.setItem('token', token);
    updateScreen();
  }
  const updateScreen = () => {
    rerender(Math.random());
  }

  const callEditEvent = (data) => {
    updateEditEvent(data);
    updateEditModalShow(true);
  }
  
  return (
    <Router>
        <Switch>
            <Route exact path="/">
              <Auth setToken={setToken}>
                <Header setToken={setToken}/>
                <EventList 
                  updateScreen={updateScreen}
                  eventService={eventService}
                  eventList={eventList}
                  callEditEvent={callEditEvent}
                />
                <AddEvent updateScreen={updateScreen}/>
                <EditEvent 
                  editEvent={editEvent}
                  updateEditEvent={(data) => updateEditEvent(data)}
                  editModalShow={editModalShow}
                  updateEditModalShow={updateEditModalShow}
                  updateScreen={updateScreen}
                />
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
