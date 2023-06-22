import React from 'react';
import './App.css';
import ReservationList from './app/ReservationList';
import Weather from './app/Weather';

// componente principal
class App extends React.Component {
  render() {
    return (
      <div className="custom-page container">
        <h1>Reservas</h1>
        <div>
          <ReservationList />
        </div>
        <h1>Widget do Tempo</h1>
        <div>
          <Weather />
        </div>
      </div>
    );
  }
}

export default App;
