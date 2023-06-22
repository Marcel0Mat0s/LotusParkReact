import React from 'react';
import './App.css';
import ReservationList from './app/ReservationList';
import Weather from './app/Weather';

// componente principal
class App extends React.Component {
  render() {
    return (
      <div className="whole-container">
        <div className="row">
          <div className="col-md-6">
            <div className="reservas-container">
              <h1 className="text-center">Reservas</h1>
              <div>
                <ReservationList />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="widget-container">
              <h1>Meteorologia</h1>
              <div>
                <Weather />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
