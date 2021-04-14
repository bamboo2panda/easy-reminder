import React, {useState} from 'react';
import EventService from '../../services/eventService';

function EventList (){
    const [eventList, updateEventList] = useState([]);
    const token = localStorage.getItem('token');
    
    let eventService = new EventService(token);
    
    eventService.getEventsList()
        .then((result) => {
            if (JSON.stringify(result) !== JSON.stringify(eventList)){
                updateEventList(result);
            }
        });
  
    return(
        eventList.map(({name, date_time}) => {
        return(
            <div class="card">
                <div class="card-body">
                    <h3>{name}</h3>
                </div>
            </div>
            );
        })
    );
}
export default EventList;