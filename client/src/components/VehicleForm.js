import React from "react";
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Radio from 'react-bootstrap/lib/Radio'
import Button from 'react-bootstrap/lib/Button'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker'
import moment from 'moment';

class VehicleForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.url = props.url;
        this.action = props.action;
        this.dateCreated = props.dateCreated;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            _id: props._id,
            name: props.name,
            lastSuccessfulConnection: props.lastSuccessfulConnection,
            carType: props.carType,
            errorMessages: []
        };
    }
    handleChange(e) {
        let inputName = e.target.name;
        let newItem = {};
        newItem[inputName] = e.target.value;
        this.setState( Object.assign(this.state, newItem) );
    }
    handleDatetimeChange = datetime => {
        this.setState( Object.assign(this.state, {lastSuccessfulConnection: datetime}) )
    }
    renderVehicleTypes() {
        const vehicleTypes = ["Truck", "SUV", "Hybrid"];
        return vehicleTypes.map((vehicleType,i) => {
            let checked = this.state.carType === vehicleType;
            return <Radio key={`ctype-radio-${i}`} name="carType" checked={checked} value={vehicleType} inline onChange={this.handleChange}>
                {vehicleType}
            </Radio>
        })
    }
    validate() {
        let errors = [];
        if (this.state.name === '') {
            errors.push('A vehicle must have a name')
        }
        if (this.state.carType === '') {
            errors.push('A vehicle must have a type')
        }
        if (errors.length > 0) {
            this.setState( Object.assign(this.state, {errorMessages: errors}) );
            return false;
        }
        return true;
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.validate()) {
            let performAction;
            if (this.action === 'update') {
                performAction = axios.put;
            } else {
                performAction = axios.post;
            }
            performAction(this.url, {
                name: this.state.name,
                carType: this.state.carType,
                lastSuccessfulConnection: moment(this.state.lastSuccessfulConnection).valueOf()
            })
                .then(response => {
                    window.location.reload()
                })
                .catch(err => {
                    this.setState( Object.assign(this.state, { errorMessages: err.message }) );
                })
        }

    }
    handleDelete(e) {
        if (window.confirm('Are you sure you wish to delete this item?')) {
            axios.delete(`/api/vehicles/${e.target.value}`)
                .then(response =>{
                    window.location.reload()
                })
        }
    }
    renderDateCreated() {
        if (this.action === 'update') {
            return <FormGroup
                controlId="formBasicText"
            >
                <ControlLabel>Date Created</ControlLabel>
                <FormControl
                    type="text"
                    name="name"
                    value={this.dateCreated}
                    disabled
                />
            </FormGroup>
        } else {
            return <div/>
        }
    }
    renderErrors() {
        return this.state.errorMessages.map( (err,i) => {
            return <div key={i} className={'error-message'}>
                {err}
            </div>
        });
    }
    renderSubmitButtons() {
        if (this.action === 'update') {
            return <ButtonToolbar>
                <Button bsClass={'btn-primary'} type="submit">Update</Button>
                <Button
                    bsClass={'btn-danger'}
                    value={this.state._id}
                    onClick={this.handleDelete}
                >Delete</Button>
            </ButtonToolbar>
        } else {
            return <ButtonToolbar>
                <Button bsClass={'btn-primary'} type="submit">Submit</Button>
            </ButtonToolbar>
        }
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup
                    controlId="formBasicText"
                >
                    <ControlLabel>Vehicle Name</ControlLabel>
                    <FormControl
                        type="text"
                        name="name"
                        value={this.state.name}
                        placeholder="Enter name"
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup
                    controlId="formBasicText"
                >
                    <ControlLabel className="inline-label">Last Successful Connection</ControlLabel>

                    <DateTimePicker
                        name="lastSuccessfulConnection"
                        value={this.state.lastSuccessfulConnection}
                        onChange={this.handleDatetimeChange}
                        maxDate={new Date()}
                    />
                </FormGroup>
                {this.renderDateCreated()}
                <FormGroup>
                    <ControlLabel className="inline-label">Vehicle Type:</ControlLabel>
                    {this.renderVehicleTypes()}
                </FormGroup>
                {this.renderSubmitButtons()}
                {this.renderErrors()}
            </form>
        );
    }
}
export default VehicleForm;