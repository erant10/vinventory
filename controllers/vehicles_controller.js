const Vehicle = require('../models/vehicle');

const messages = {
    update_success: () => `Vehicle successfully updated`,
    delete_success: () => `Vehicle successfully deleted`
}

module.exports = {
    getList(req,res,next) {
        Vehicle.find({})
            .then( vehicles => {
                res.send(vehicles);
            })
            .catch(next)
    },

    create(req,res,next) {
        const vehicleProps = req.body;

        Vehicle.create(vehicleProps)
            .then(vehicle => res.send(vehicle))
            .catch(next)
    },

    getOne(req,res,next) {
        const vehicleId = req.params.id;

        Vehicle.findById(vehicleId)
            .then(vehicle => {
                res.send(vehicle)
            })
            .catch(next)
    },

    edit(req,res,next) {
        const vehicleId = req.params.id,
            vehicleProps = req.body;

        Vehicle.findByIdAndUpdate({_id: vehicleId}, vehicleProps)
            .then(() => {
                res.send({
                    message: messages.update_success()
                })
            })
            .catch(next)
    },

    delete(req,res,next) {
        const vehicleId = req.params.id;

        Vehicle.findByIdAndRemove({ _id: vehicleId })
            .then(vehicle => res.send({
                vehicle: vehicle,
                message: messages.delete_success()
            }))
            .catch(next)
    }
}