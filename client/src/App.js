import React, { Component } from 'react';
import './App.css';
import InventoryTable from './components/VehicleTable'
import VehicleModal from './components/VehicleModal'
import Navbar from 'react-bootstrap/lib/Navbar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="">Vehicle Inventory</a>
                </Navbar.Brand>
            </Navbar.Header>
        </Navbar>
        <div className="AppBody">
            <h3>Vehicles</h3>
          <InventoryTable/>
        </div>
        <VehicleModal/>
      </div>
    );
  }
}

export default App;
