import React, {useState} from 'react';
import AddEventModal from '../../pages/addEventModal';
import EventService from '../../services/eventService';
import { Button } from 'react-bootstrap';

const AddEvent = (props) => {
    const [name, setName] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    const handleChangeName = (event) => {
        event.preventDefault();
        setName(event.target.value);
    }

    const handleChangeDateTime = (event) => {
        event.preventDefault();
        setDateTime(event.target.value);
    }

    const handleAddEventSubmit = (event) => {
        event.preventDefault();
        const eventService = new EventService();
        eventService.addEvent({name, date_time: dateTime})
        .then((e) => {
            // event.target.closest(".modal").close();
            console.log("SUCCESS");
            console.log(e);
            setModalIsOpen(false);
            props.updateScreen();
        })
        .catch((e) => {
            console.log(e);
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