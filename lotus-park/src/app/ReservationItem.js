import React, {Component} from 'react';

class ReservationItem extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { reservation, id } = this.props;

        return(
            <li class="list-group-item">
                <div class="row align-items-center">
                    <div class="col-md-6">
                    Vaga: {reservation.vaga}<br/>
                    Início: {reservation.dateInit}<br/>
                    Fim: {reservation.dateEnd}
                    </div>
                    <div class="col-md-6">
                    <button type="submit" class="btn btn-danger ms-2" onClick={() => this.props.handleDeleteItem(id)}>Eliminar</button>
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal" type="submit" class="btn btn-warning ms-2" onClick={() => this.props.handleEditItem(id)}>Editar</button>
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal" type="submit" class="btn btn-success ms-2" onClick={() => this.props.handleStatusChange()}>
                        {reservation.status === 0 ? 'Fechar' : 'Reabrir'}
                    </button>
                    </div>
                </div>
            </li>

        );
    }
}

export default ReservationItem;
