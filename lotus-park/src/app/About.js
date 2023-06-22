import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <div>
                <h3>Desenvolvimento Web 2022/23
                    Engenharia Informática</h3>
                <h4>Autores:</h4>
                <p>23028 - Marcelo Matos</p>
                <p>23048 - Gonçalo Alpalhão</p>
                <p><a href="https://github.com/Marcel0Mat0s/LotusParkReact.git">Repositório Github</a></p>
                <h4>Bibliotecas Usadas</h4>
                <p>React, Bootstrap, React Semantic UI, React Live Clock</p>
                <h4>APIs Usadas</h4>
                <p>OpenWeatherMap</p>
                <h4>Código de Terceiros</h4>
                <p><a href="https://github.com/gauravghai/weatherApp-Reactjs/blob/master/src/currentLocation.js">Implementação do OpenWeather</a></p>

            </div>
        );
    }
}

export default About;