import React, {useState} from 'react';
import AddEventModal from '../../pages/addEventModal';
import EventService from '../../services/eventService';
import { Button } from 'react-bootstrap';
import moment from 'moment-timezone';

moment.tz.setDefault("America/New_York");
console.log(moment);

const AddEvent = (props) => {
    const [name, setName] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    const handleChangeName = (event) => {
        event.preventDefault();
        setName(event.target.value);
    }

    const handleChangeDateTime = (date, dateString) => {
        setDateTime(dateString);
    }

    const handleAddEventSubmit = (event) => {
        event.preventDefault();
        const eventService = new EventService();
        eventService.addEvent({name, date_time: dateTime})
        .then((e) => {
            setModalIsOpen(false);
            props.updateScreen();
        })
        .catch((e) => {
            throw new Error("Bad event addition.");
        });
    }
    const showModal = () => {
        setModalIsOpen(true);
    }

    const hideModal = () => {
        setModalIsOpen(false);
    }

    return (
        <div>
            <Button variant="success" onClick={showModal}>Add new event</Button>
            <AddEventModal 
                id="addEventModal" 
                modalIsOpen={modalIsOpen}
                hideModal={hideModal}
                handleAddEventSubmit={handleAddEventSubmit}
                handleChangeName={handleChangeName}
                handleChangeDateTime={handleChangeDateTime}
            />
            
        </div>
    );
}

export default AddEvent;