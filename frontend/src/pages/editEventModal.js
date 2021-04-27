import React from 'react';
import {Modal, Button, InputGroup, FormControl, Form} from 'react-bootstrap';
import moment from 'moment-timezone';
import { DatePicker as DP } from 'antd';
import 'antd/dist/antd.css';

const EditEventModal = ({showModal, onHide, onSubmit, eventData, handleChangeName, handleChangeDateTime}) => {
    console.log('eventData');
    console.log(eventData);
    const {name, date_time} = eventData;
    return (
        <Modal show={showModal} onHide={onHide}>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <InputGroup className="mb-3">
                        <FormControl
                        name="name"
                        id="name"
                        placeholder="Name"
                        aria-label="Name"
                        aria-describedby="name"
                        onChange={(name) => handleChangeName(name)}
                        defaultValue={name}
                        />
                    </InputGroup>
                    
                    <DP showTime defaultValue={moment(date_time)} onChange={(date, dateString) => handleChangeDateTime(date, dateString)}/>
                    <Button type="submit" variant="primary">Save event</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EditEventModal;


