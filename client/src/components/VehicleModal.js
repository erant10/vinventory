import {Component} from "react";
import React from "react";
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import VehicleForm from './VehicleForm'

class VehicleModal extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <div>
                <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                    Add a Vehicle
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new car to inventory</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <VehicleForm
                            _id={''}
                            name={''}
                            lastSuccessfulConnection={''}
                            carType={''}
                            action={'add'}
                            url={'api/vehicles'}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default VehicleModal;