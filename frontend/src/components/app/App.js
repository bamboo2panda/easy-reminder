import './App.css';

import React, {useState} from 'react';
import Auth from '../../components/auth';
import EventList from '../../components/eventList';
import Header from '../../components/header';


const App = () => {
  const [, rerender] = useState(null);
  
  const setToken = (token) => {
    localStorage.setItem('token', token);
    rerender(Math.random());
  }
  
  return (
    <Auth setToken={setToken}>
      <Header setToken={setToken}/>
      <EventList/>
    </Auth>
  );
}

export default App;
