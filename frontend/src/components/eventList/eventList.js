import React, {useState} from 'react';
import EventService from '../../services/eventService';
import { Card, Button } from 'react-bootstrap';
import moment from 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

moment.tz.setDefault("America/New_York");
console.log(moment);

function EventList (props){
    const [eventList, updateEventList] = useState([]);
    
    let eventService = new EventService();
    
    eventService.getEventsList()
        .then((result) => {
            if (JSON.stringify(result) !== JSON.stringify(eventList)){
                updateEventList(result);
            }
        });
    
    const deleteEvent = (id) => {
        console.log(id);
        eventService.deleteEvent(id)
        .then((result) => {
                props.updateScreen()
        })
        .catch((result) => {console.log(result)});
    }
  
    return(
        console.log(eventList),
        eventList.map(({id, name, date_time}) => {
        return(
            <Card>
                <Card.Body>
                    <h3>{name}</h3>
                    <strong>{date_time}</strong>
                    <Button onClick={() => deleteEvent(id)}><FontAwesomeIcon icon={faTimes}/></Button>
                </Card.Body>
            </Card>
            );
        })
    );
}
export default EventList;