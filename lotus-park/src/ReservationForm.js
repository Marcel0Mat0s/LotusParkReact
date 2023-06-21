import React, { useState } from 'react';

// componente que recebe a função para adicionar uma reserva
const ReservationForm = ({ addReservation}) => {
    
    // constante que guarda o valora do nome
    const [name, setName] = useState('');
    // constante que guarda o valor da data
    const [date, setDate] = useState('');

    // função que é chamada quando o formulário é submetido
    const handleSubmit = (e) => {

        // previne o comportamento padrão do formulário
        e.preventDefault();
        // verifica se o nome e a data foram preenchidos
        if (name && date) {
            // cria um objeto com o nome e a data
            const reservation = {
                // gera um id aleatório
                id: Date.now(),
                // nome
                name,
                // data
                date
            };

            // adiciona a reserva
            addReservation(reservation);

            // limpa o formulário
            setName('');
            setDate('');
        }
    };

    // retorna o formulário
    return (

        // quando o formulário for submetido, chama a função handleSubmit
        <form onSubmit={handleSubmit}>
        {/* input para o nome que chama a função setName quando o valor é alterado */}
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        {/* input para a data que chama a função setDate quando o valor é alterado */}
        <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
        />
        {/* botão para adicionar a reserva */}
        <button type="submit">Adicionar reserva</button>
        </form>
    );
};

export default ReservationForm;