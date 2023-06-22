import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import ReservationItem from "./ReservationItem";

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
        // previne que os campos estejam vazios e que a vaga não seja apenas espaços
        if(this.state.vaga.trim() === '' || this.state.dateInit === '' || this.state.dateEnd === ''){
            alert('Preencha todos os campos!');
            return;
        }
        // Previne que a data de início seja superior à data de fim
        else if(this.state.dateInit > this.state.dateEnd){
            alert('A data de início não pode ser superior à data de fim!');
            return;
        }
        // Previne inserir uma vaga que já existe na lista de reservas abertas
        else if(this.state.reservations.some(reserva => reserva.vaga === this.state.vaga && reserva.status === 0)){
            alert('A vaga já existe!');
            return;
        }
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

    // função que fecha o modal
    handleClose(save) {
        // se o utilizador clicar em guardar
        if (save) {
          // cria uma lista auxiliar
          let listaAux = this.state.reservations;
          // altera os valores da reserva
            listaAux[this.state.id].vaga = this.state.vaga;
            listaAux[this.state.id].dateInit = this.state.dateInit;
            listaAux[this.state.id].dateEnd = this.state.dateEnd;
          // atualiza o estado
          this.setState({ showModal: false, reservations: listaAux });

          // se o utilizador clicar em cancelar
        } else {
          this.setState({ showModal: false });
        }
      }

    // função que muda o estado da reserva após a data de fim
    handleStatus(id){
        // cria uma lista auxiliar
        let listaAux = this.state.reservations;
        // muda o estado da reserva
        listaAux[id].status === 0 ? listaAux[id].status = 1 : listaAux[id].status = 0;
        // atualiza o estado
        this.setState({ reservations: listaAux });
    }

    // função para verificar se algum item da lista já passou a data de fim e mudar o estado para 1
    componentDidMount(){
        // cria uma lista auxiliar
        let listaAux = this.state.reservations;
        // percorre a lista
        listaAux.map((reservation, id) => {
            // se a data de fim for inferior à data atual
            if(reservation.dateEnd < new Date().toISOString().slice(0, 10)){
                // muda o estado da reserva
                reservation.status = 1;
            }else{
                // muda o estado da reserva
                reservation.status = 0;
            }
        });
        // atualiza o estado
        this.setState({ reservations: listaAux });
    }

    // executar a verificação a cada 10 segundos
    componentWillMount(){
        setInterval(() => {
            // cria uma lista auxiliar
            let listaAux = this.state.reservations;
            // percorre a lista
            listaAux.map((reservation, id) => {
                // se a data de fim for inferior à data atual
                if(reservation.dateEnd < new Date().toISOString().slice(0, 10)){
                    // muda o estado da reserva
                    reservation.status = 1;
                }else{
                    // muda o estado da reserva
                    reservation.status = 0;
                }
            });
            // atualiza o estado
            this.setState({ reservations: listaAux });
        }, 10000);
    }

    render(){
        let finishedReservations = this.state.reservations.map((reservation, id) => {
            if (reservation.status === 1) {
              return (
                <ReservationItem
                  reservation={reservation}
                  handleDeleteItem={() => this.handleDeleteReservation(id)}
                  handleEditItem={() => this.handleEditReservation(id)}
                  handleStatusChange={() => this.handleStatus(id)}
                />
              );
            }
          });
        
          let unfinishedReservations = this.state.reservations.map((reservation, id) => {
            if (reservation.status === 0) {
              return (
                <ReservationItem
                  reservation={reservation}
                  handleDeleteItem={() => this.handleDeleteReservation(id)}
                  handleEditItem={() => this.handleEditReservation(id)}
                  handleStatusChange={() => this.handleStatus(id)}
                />
              );
            }
          });

        return (
            <div>
                <h4 className="text-center">Inserir Reserva</h4>
                <div className="row">
                    <div className="col-md col-xs-12">
                        <div className="d-flex flex-column">
                        <label htmlFor="vaga" className="form-label">Insira a vaga:</label>
                        <input type="text" value={this.state.vaga} onChange={(evt) => this.handleChangeVaga(evt)} className="form-control" />
                        </div>
                        <div className="d-flex flex-column">
                        <label htmlFor="dateInit" className="form-label">Data de início:</label>
                        <input type="date" value={this.state.dateInit} onChange={(evt) => this.handleChangeDateInit(evt)} className="form-control"/>
                        </div>
                        <div className="d-flex flex-column">
                        <label htmlFor="dateEnd" className="form-label">Data de fim:</label>
                        <input type="date" value={this.state.dateEnd} onChange={(evt) => this.handleChangeDateEnd(evt)} className="form-control"/>
                        </div>
                        <br />
                        <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary" onClick={() => this.handleAddReservation()}>Adicionar</button>
                        </div>
                    </div>
                </div>
                <br />
                <h4 className="text-center">Lista de Reservas</h4>
                <div class="mb-3 row">
                    <div class="col-md col-xs-12">
                        <Accordion defaultActiveKey={['0', '1']} alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Reservas Abertas</Accordion.Header>
                                <Accordion.Body>
                                    <ul class="list-group">
                                        {unfinishedReservations}
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Reservas Fechadas</Accordion.Header>
                                <Accordion.Body>
                                    <ul class="list-group">
                                        {finishedReservations}
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>

                <Modal show={this.state.showModal} onHide={() => this.handleClose(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Reserva</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div class="mb-3 row">
                            <div class="col-md-6 col-xs-12">
                                <label for="vaga" class="form-label">Insira a vaga</label>
                                <input type="text" value={this.state.vaga} onChange={(evt) => this.handleChangeVaga(evt)} />
                            </div>
                            <div class="col-md-6 col-xs-12">
                                <label for="dateInit" class="form-label">Insira a data de inicio</label>
                                <input type="date" value={this.state.dateInit} onChange={(evt) => this.handleChangeDateInit(evt)} />
                            </div>
                            <div class="col-md-6 col-xs-12">
                                <label for="dateEnd" class="form-label">Insira a data de fim</label>
                                <input type="date" value={this.state.dateEnd} onChange={(evt) => this.handleChangeDateEnd(evt)} />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose(false)}>
                            Sair
                        </Button>
                        <Button variant="primary" onClick={() => this.handleClose(true)}>
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ReservationList;
