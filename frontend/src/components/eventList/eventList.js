import React, {useState} from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import moment from 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

moment.tz.setDefault("America/New_York");
console.log(moment);

function EventList (props){
    const {eventService, eventList, callEditEvent} = props;
    
    const deleteEvent = (id) => {
        eventService.deleteEvent(id)
        .then(() => {
                props.updateScreen()
        })
        .catch((result) => {console.log(result)});
    }
  
    return(
        console.log(eventList),
        eventList.map((data) => {
        const {id, name, date_time} = data;
        return(
            <Card>
                <Card.Body>
                    <Card.Text>
                    <h3>{name}</h3>
                    <strong>
                        {new Intl.DateTimeFormat("ru-RU", {
                            dateStyle: 'full', timeStyle: 'short'
                        }).format(
                            new Date(date_time)
                        )}
                    </strong>
                    </Card.Text>
                    <Button onClick={() => callEditEvent(data)}><FontAwesomeIcon icon={faPencilAlt}/></Button>&nbsp;
                    <Button onClick={() => deleteEvent(id)}><FontAwesomeIcon icon={faTimes}/></Button>
                </Card.Body>
            </Card>
            );
        })
    );
}
export default EventList;