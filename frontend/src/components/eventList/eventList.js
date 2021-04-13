import React, {useState} from 'react';
import EventService from '../../services/eventService';

function EventList (props){
    const [eventList, updateEventList] = useState([]);
    console.log(props.token);
    
    let eventService = new EventService(props.token);
    
    eventService.getEventsList()
        .then((result) => {
            if (JSON.stringify(result) !== JSON.stringify(eventList)){
                updateEventList(result);
                console.log(result);
                console.log(eventList);
            }
        });
  
    return(
        eventList.map(({name, date_time}) => {
        return(
        <p> 
            {name}
        </p>);
        })
    );
}

export default EventList;