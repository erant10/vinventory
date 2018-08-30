const VehiclesController = require('../controllers/vehicles_controller');

module.exports = (app) => {

    /* Vehicles API */

    // get a list of vehicles in the fleet
    app.get('/api/vehicles', VehiclesController.getList);

    // create a vehicle
    app.post('/api/vehicles', VehiclesController.create);

    // get a specific vehicle
    app.get('/api/vehicles/:id', VehiclesController.getOne);

    // update a vehicle
    app.put('/api/vehicles/:id', VehiclesController.edit);

    // delete a vehicle
    app.delete('/api/vehicles/:id', VehiclesController.delete)

};