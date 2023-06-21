import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';

class ReservationList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reservations: [],
            showModal: false,
            id: 0,
            vaga: '',
            dateInit: '',
            dateEnd: ''
        }
    }

    // função que muda o valor do input da vaga
    handleChangeVaga(event){
        this.setState({ vaga: event.target.value });
    }

    // função que muda o valor do input da data de início
    handleChangeDateInit(event){
        this.setState({ dateInit: event.target.value });
    }

    // função que muda o valor do input da data de fim
    handleChangeDateEnd(event){
        this.setState({ dateEnd: event.target.value });
    }

    // função que adiciona uma reserva
    handleAddReservation(){
        // guarda a reserva numa constante
        let reserva = {vaga: this.state.vaga, dateInit: this.state.dateInit, dateEnd: this.state.dateEnd, status: 0 };
        // cria uma lista auxiliar
        let listaAux = this.state.reservations;
        // adiciona a reserva à lista
        listaAux.push(reserva);

        // atualiza o estado
        this.setState({ reservations: listaAux, vaga: '', dateInit: '', dateEnd: '' });
    }

    // função que elimina uma reserva
    handleDeleteReservation(id){
        // cria uma lista auxiliar
        let listaAux = this.state.reservations;
        // elimina a reserva da lista
        listaAux.splice(id, 1);

        // atualiza o estado
        this.setState({ reservations: listaAux });
    }

    // função que edita uma reserva
    handleEditReservation(index){
        // ir buscar a reserva com o id
        let reserva = this.state.reservations[index];
        
        this.setState({ showModal: true, index: reserva.id, vaga: reserva.vaga, dateInit: reserva.dateInit, dateEnd: reserva.dateEnd });
    }

    // função que guarda a reserva editada
    handleSaveReservation(){
        // guarda a reserva numa constante
        let reserva = { id: this.state.id, vaga: this.state.vaga, dateInit: this.state.dateInit, dateEnd: this.state.dateEnd };
        // cria uma lista auxiliar
        let listaAux = this.state.reservations;
        // adiciona a reserva à lista
        listaAux[this.state.id] = reserva;

        // atualiza o estado
        this.setState({ reservations: listaAux, showModal: false, id: 0, vaga: '', dateInit: '', dateEnd: '' });
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-12">
                        <h1>Reservas</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReservationList;
