import React, {Component} from 'react';

class ReservationItem extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { reservation, id } = this.props;

        return(
            <li class="list-group-item">{reservation.vaga} - {reservation.dateInit} - {reservation.dateEnd}
                <button type="submit" className="btn btn-danger ms-5" onClick={() => this.props.handleDeleteItem(id)}>Eliminar</button>
                <button data-bs-toggle="modal" data-bs-target="#exampleModal" type="submit" className="btn btn-warning ms-5" onClick={() => this.props.handleEditItem(id)}>Editar</button>
                <button data-bs-toggle="modal" data-bs-target="#exampleModal" type="submit" className="btn btn-success ms-5" onClick={() => this.props.handleStatusChange()}>{ this.props.item.status===0 ? 'Concluir' : 'Desconcluir' }</button>
            </li>
        );
    }
}

export default ReservationItem;
