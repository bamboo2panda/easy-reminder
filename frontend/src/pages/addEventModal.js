import React, {Component} from 'react';
import {Modal, Button, InputGroup, FormControl} from 'react-bootstrap';
import { DatePicker as DP } from 'antd';
import moment from 'moment-timezone';
import 'antd/dist/antd.css';

moment.tz.setDefault("America/New_York");
console.log(moment);

export default class AddEventModal extends Component{
    setIsOpen = (data) => {
        this.setState({
            isOpen: data
        })
    }

    showModal = () => {
        this.setIsOpen(true);
    };

    hideModal = () => {
        this.setIsOpen(false);
    };

    render (){
        return(
            <div>
                <Modal show={this.props.modalIsOpen} onHide={this.props.hideModal}>
                    <Modal.Header>Add new event</Modal.Header>
                    <Modal.Body>
                    <form onSubmit={this.props.handleAddEventSubmit}>
                        <InputGroup className="mb-3">
                            
                            <FormControl
                            name="name"
                            id="name"
                            placeholder="Name"
                            aria-label="Name"
                            aria-describedby="name"
                            onChange={this.props.handleChangeName}
                            />
                        </InputGroup>
                        {/* <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="date-time">
                                    <FontAwesomeIcon icon={faCalendarAlt}/>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                            name="date-time"
                            id="date-time"
                            placeholder="2021-02-01 15:00:00"
                            aria-label="Date and time"
                            aria-describedby="date-time"
                            onChange={this.props.handleChangeDateTime}
                            />
                        </InputGroup> */}
                        <DP showTime onChange={this.props.handleChangeDateTime}/>
                        <Button type="submit" variant="primary">Save event</Button>
                    </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    } 
}