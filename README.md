### Vehicle Inventory
A simple inventory application.
The App is divided into 2 separate sections:
- BackEnd: A REST api for simple CRUD commands of vehicles. Implemented using Express and mongoose.
- FrontEnd: A React App Which utilizes the API through a UI. Implemented with Bootstrap.

#### Prerequesites

- Make sure MongoDB is installed and running

    ```{shell}
    mongod
    ```

    to configure the mongoDB connection change (if necessary) inside app.js:
    ```
    const mongoHost = 'localhost',
        mongoPort = '27017',
        collectionName = 'vinventory';
    ```
##### Installation

- Install server dependencies:
    ```
    npm install
    ```

- change to the client directory and install client dependencies:
    ```
    cd client
    npm install
    ```

##### Running
```
npm run start-app
```

##### Structure

The app is build as 2 separate 'servers'. One is for the inventory REST API (the Backend, listening for requests
on port 5000), and the other is the react project for the Front End (listening on port 3000).


```bash
├── bin
│   ├── www                             # Server execution file
├── client                              # the client side implementation
│   ├── etc
│   ├── node_modules
│   ├── public
│   │    ├── icons
│   │    ├── manifest.json
│   │    └── index.html
│   ├── src
│   │    ├── components
│   │    │    ├── VehicleForm.js        # a react component for the vehicle creation/edit form
│   │    │    ├── VehicleModal.js       # a react component for the modal containing the VehicleForm
│   │    │    └── VehicleTable.js       # a react component for the table of vehicles
│   │    ├── App.css
│   │    ├── App.js
│   │    ├── index.css
│   │    └── index.js
│   └── package.json
├── controllers
│   └── vehicles_controller.js          # the controller for the api endpoints
├── models
│   └── vehicle.js                      # the db model and schema creation of the vehicles
├── node_modules
├── routes
│   └── api.js                          # the API endpoints
├── package.json
├── README.md
├── app.js
└── .gitignore
```
