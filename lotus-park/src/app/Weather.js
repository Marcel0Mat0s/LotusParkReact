import React, { Component } from 'react';
import Clock from 'react-live-clock';

//Constante que vai buscar a data atual
const dateBuilder = (d) => {

    // Array com os meses
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

    // Array com os dias da semana
    let days = [
        "Domingo",
        "Segunda-Feira",
        "Terça-Feira",
        "Quarta-Feira",
        "Quinta-Feira",
        "Sexta-Feira",
        "Sábado",
    ];

    // Variáveis que vão buscar o dia, mês e ano atual
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day}, ${date} ${month} ${year}`
}

class Weather extends Component {

    // Estado inicial do componente
    state = {
        country: "PT",
        city: "Tomar",
        temp: "0",
        humidity: "0",
        description: "Desconhecido"
    };

    // Função que vai buscar a localização do utilizador e a meteorologia
    componentDidMount() {
        // Se o utilizador permitir a localização
        if (navigator.geolocation) {
            this.getPosition()
                // Se a localização for obtida com sucesso
                .then((position) => {
                    // Guarda a latitude e longitude do utilizador
                    this.getWeather(position.coords.latitude, position.coords.longitude);
                })
                // Se a localização não for obtida com sucesso
                .catch((err) => {
                    // Mostra a meteorologia de Tomar por defeito
                    this.getWeather(39.600562, -8.390449);
                    // Alerta o utilizador
                    alert(
                        "Desabilitou a localização, por favor habilite-a para ver a meteorologia da sua localização atual. Por defeito, será mostrada a meteorologia de Tomar."
                    );
                });
            // Quando o browser não suporta a geolocalização
        } else {
            alert("Geolocalização não suportada pelo browser.");
        }

        // Atualiza a meteorologia de 10 em 10 minutos (600000 milisegundos)
        this.timerID = setInterval(
            () => this.getWeather(this.state.lat, this.state.lon),
            600000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    // Função que vai buscar a localização do utilizador
    getPosition = (options) => {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
    };


    // Função que vai buscar a meteorologia à API do OpenWeatherMap
    getWeather = async (lat, lon) => {
        // Chamada à API
        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9ec6b8792977153a9db9dc83d2134ec5&units=metric&lang=pt`);
        // Guarda a resposta da API em formato JSON
        const data = await api_call.json();
        // Se a resposta da API não contiver informação mantém a meteorologia anterior
        if (data.name === undefined) return;
        // Guarda os dados da resposta da API no state do componente
        this.setState({
            city: data.name,
            country: data.sys.country,
            temp: Math.round(data.main.temp),
            humidity: data.main.humidity,
            description: data.weather[0].description
        });
    }

    render() {
        return (
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
                                {this.state.humidity}%<span> Humidade</span>
                            </p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Weather;