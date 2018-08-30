var express = require('express');
var router = express.Router();
const VehiclesController = require('../controllers/vehicles_controller');

module.exports = (app) => {

    /* Vehicles API */

    // get a list of vehicles in the fleet
    app.get('/vehicles', VehiclesController.getList);

    // create a vehicle
    app.post('/vehicles', VehiclesController.create);

    // get a specific vehicle
    app.get('/vehicles/:id', VehiclesController.getOne);

    // update a vehicle
    app.put('vehicles/:id', VehiclesController.edit);

    // delete a vehicle
    app.delete('vehicles/:id', VehiclesController.delete)

};

module.exports = router;
