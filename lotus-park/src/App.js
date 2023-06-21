import React from 'react';
import './App.css';
import ReservationList from './app/ReservationList';

// componente principal
class App extends React.Component {
  render() {
    return (
      <div className="custom-page container">
        <div>
          <ReservationList />
        </div>
      </div>
    );
  }
}

export default App;
