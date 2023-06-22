import React, {Component} from 'react';
import Clock from 'react-live-clock';

const dateBuilder = (d) => {
    let months = [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro",
        ];
    let days = [
        "Domingo",
        "Segunda-Feira",
        "Terça-Feira",
        "Quarta-Feira",
        "Quinta-Feira",
        "Sexta-Feira",
        "Sábado",
        ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day}, ${date} ${month} ${year}`
}

class Weather extends Component{
    
    state = {
        country: undefined,
        city: undefined,
        temp: undefined,
        humidity: undefined,
        description: undefined
    };
    
    componentDidMount() {
        if (navigator.geolocation) {
          this.getPosition()
            //If user allow location service then will fetch data & send it to get-weather function.
            .then((position) => {
              this.getWeather(position.coords.latitude, position.coords.longitude);
            })
            .catch((err) => {
              //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
              this.getWeather(39.600562, -8.390449);
              alert(
                "Desabilitou a localização, por favor habilite-a para ver a meteorologia da sua localização atual. Por defeito, será mostrada a meteorologia de Tomar."
              );
            });
        } else {
          alert("Geolocalização não suportada pelo browser.");
        }
    
        this.timerID = setInterval(
          () => this.getWeather(this.state.lat, this.state.lon),
          600000
        );
      }
    
      componentWillUnmount() {
        clearInterval(this.timerID);
      }

      getPosition = (options) => {
        return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
      };


    getWeather = async (lat, lon) => {
        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=73a64817863db278534b045b535fdc31&units=metric&lang=pt`);
        const data = await api_call.json();
        console.log(data);
        this.setState({
            city: data.name,
            country: data.sys.country,
            temp: Math.round(data.main.temp),
            humidity: data.main.humidity,
            description: data.weather[0].description
        });
        
    }

    render(){

        return(
            <React.Fragment>
                <div className="city">
            <div className="title">
              <h2>{this.state.city} - {this.state.country} </h2>
              <h3>{this.state.description}</h3>
            </div>
            <div className="date-time">
              <div className="dmy">
                <div id="txt"></div>
                <div className="current-time">
                  <Clock format="HH:mm:ss" interval={1000} ticking={true} />
                </div>
                <div className="current-date">{dateBuilder(new Date())}</div>
              </div>
              <div className="temperature">
                <p>
                  {this.state.temp}°<span>C</span> <br />
                {this.state.humidity}%<span>Humidade</span>
                </p>
              </div>
            </div>
          </div>
            </React.Fragment>
        );
    }
}

export default Weather;