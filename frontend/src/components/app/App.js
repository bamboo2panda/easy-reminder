import './App.css';

import React, {useState} from 'react';
import Auth from '../../components/auth';
import EventList from '../../components/eventList';


function App() {
  const [token, updateToken] = useState();
  console.log(token);
  return (
    <Auth token={token} updateToken={updateToken}>
      <EventList token={token}/>
    </Auth>
  );
}

export default App;
