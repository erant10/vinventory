const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('node-uuid');
// Will add the UUID type to the Mongoose Schema types
require('mongoose-uuid2')(mongoose);
const UUID = mongoose.Types.UUID;
const moment = require('moment')

const messages = {
    required_field: (field_name) => `Field \'${field_name}\' is required.`
}

function getTime() {
    return moment().valueOf()
}

const VehicleSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    name: {
        type: String,
        required: [true, messages.required_field('name')],
    },
    dateCreated: {
        type: Number,
        default: getTime
    },
    carType: {
        type: String,
        enum: ["SUV", "Truck", "Hybrid"]
    },
    lastSuccessfulConnection: {
        type: Number
    }
});


const Vehicle = mongoose.model('vehicle', VehicleSchema);

module.exports = Vehicle;
