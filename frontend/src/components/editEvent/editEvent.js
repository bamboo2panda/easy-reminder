import React from 'react';
import EventService from '../../services/eventService';
import EditEventModal from '../../pages/editEventModal';

const EditEvent = ({editEvent, editModalShow, updateEditModalShow, updateEditEvent, updateScreen}) => {

    const eventService = new EventService();

    const hideEditEventModal = () => {
        updateEditModalShow(false);
    } 

    const submitEditEvent = (event) => {
        event.preventDefault();
        eventService.updateEvent(editEvent.id,
            {
                'name': editEvent.name,
                'date_time': editEvent.date_time
            }
        )
        .then((e)=>{
            console.log(e);
            hideEditEventModal();
            updateScreen();
        })
        .catch((e)=>{
            throw new Error("Bad event update.");
        });
        return false;
    }

    const handleChangeName = (event) => {
        const name = event.target.value;
        const eventData = {...editEvent, 'name': name}
        updateEditEvent(eventData);
        console.log('Name = ' + name);
    }

    const handleChangeDateTime = (date_time) => {
        const eventData = {...editEvent, 'date_time': date_time._d}
        updateEditEvent(eventData);
        console.log('Date time = ' + date_time);
    }

    return (
        <EditEventModal
            showModal={editModalShow}
            onHide={hideEditEventModal}
            onSubmit={submitEditEvent}
            eventData={{
                'name': editEvent.name,
                'date_time': editEvent.date_time   
            }}
            handleChangeName={handleChangeName}
            handleChangeDateTime={handleChangeDateTime}
        />
    );
}

export default EditEvent;