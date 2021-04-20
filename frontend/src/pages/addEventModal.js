import React, {Component} from 'react';
import {Modal, Button, InputGroup, FormControl} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';

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
                        <InputGroup className="mb-3">
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
                        </InputGroup>
                        <Button type="submit" variant="primary">Save event</Button>
                    </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    } 
}