import {Component} from "react";
import React from "react";
import Table from 'react-bootstrap/lib/Table'
import Button from 'react-bootstrap/lib/Button'
import axios from 'axios';
import moment from 'moment';
import Modal from "react-bootstrap/lib/Modal";
import VehicleForm from './VehicleForm'

class InventoryTable extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleVehicleClick = this.handleVehicleClick.bind(this);
        this.handleShowVehicleDetails = this.handleShowVehicleDetails.bind(this);
        this.handleCloseVehicleDetails = this.handleCloseVehicleDetails.bind(this);
        this.state = {
            vehicles: [],
            showDetails: false,
            chosenVehicle: {
                _id: '',
                name: '',
                lastSuccessfulConnection: '',
                carType: '',
                dateCreated: '',
                action: 'update',
                url: ''
            }
        };
    }

    componentDidMount() {
        axios.get(`/api/vehicles`)
            .then(res => {
                const vehicles = res.data;
                this.setState( Object.assign(this.state, { vehicles: vehicles }) );
            });
    }

    renderTableHead() {
        let theaders = ["Vehicle Name", "Date Created", "Car Type"];

        return theaders.map((item,i) => {
            return <th key={i}>{item}</th>
        })
    }

    handleVehicleClick(e) {
        axios.get(`/api/vehicles/${e.target.value}`)
            .then(res => {
                this.handleShowVehicleDetails(res.data);
            });

        console.log();
    }

    renderTableRows() {
        if (this.state.vehicles.length === 0) {
            return <tr>
                <td colSpan={3}>No vehicles to show</td>
            </tr>
        }
        return this.state.vehicles.map((vehicle,vehicleIndex) => {
            return <tr key={vehicle._id}>
                <td><Button bsClass='btn-link' value={vehicle._id} onClick={this.handleVehicleClick}>{vehicle.name}</Button></td>
                <td>{moment(vehicle.dateCreated ).format('LLLL')}</td>
                <td><img alt={vehicle.carType} src={`./icons/${vehicle.carType}.png`} className='vehicleIcon'></img>{vehicle.carType}</td>
            </tr>
        })
    }

    handleCloseVehicleDetails() {
        this.setState(Object.assign(this.state,{ showDetails: false, chosenVehicle: {} }));
    }

    getLastConnectionDate(datetime) {
        if (datetime && datetime !== '') {
            return new Date(datetime)
        } else {
            return ''
        }
    }

    handleShowVehicleDetails(vehicle) {
        this.setState(Object.assign(this.state, {
            showDetails: true,
            chosenVehicle: {
                _id: vehicle._id,
                name: vehicle.name,
                lastSuccessfulConnection: this.getLastConnectionDate(vehicle.lastSuccessfulConnection),
                dateCreated: moment(vehicle.dateCreated).format('LLLL'),
                carType: vehicle.carType,
                action: 'update',
                url: `/api/vehicles/${vehicle._id}`
            }
        }));
    }

    render() {
        return (
            <div>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        {this.renderTableHead()}
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderTableRows()}
                    </tbody>
                </Table>
                <Modal show={this.state.showDetails} onHide={this.handleCloseVehicleDetails}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Vehicle Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <VehicleForm
                            _id={this.state.chosenVehicle._id}
                            name={this.state.chosenVehicle.name}
                            lastSuccessfulConnection={this.state.chosenVehicle.lastSuccessfulConnection}
                            carType={this.state.chosenVehicle.carType}
                            dateCreated={this.state.chosenVehicle.dateCreated}
                            action={this.state.chosenVehicle.action}
                            url={this.state.chosenVehicle.url}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleCloseVehicleDetails}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default InventoryTable;

