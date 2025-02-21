import { Link, useNavigate } from 'react-router-dom';

import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import { MouseEventHandler } from 'react';

import auth from '../utils/auth';

interface TicketCardProps {
  ticket: TicketData;
  deleteTicket: (ticketId: number) => Promise<ApiMessage>
}

const TicketCard = ({ ticket, deleteTicket }: TicketCardProps) => {
  const navigate = useNavigate();

  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
    if (!auth.loggedIn()) {
      navigate('/login');
      return;
    }

    const idTicket = Number(event.currentTarget.value);
    if (!isNaN(idTicket)) {
      try {
        await deleteTicket(idTicket);
      } catch (err) {
        console.error('Failed to delete ticket', err);
      }
    }
  };

  return (
    <div className='ticket-card'>
      <h3>{ticket.name}</h3>
      <p>{ticket.description}</p>
      <p>{ticket.assignedUser?.username}</p>
      <Link to='/edit' state={{id: ticket.id}} type='button' className='editBtn'>Edit</Link>
      <button type='button' value={String(ticket.id)} onClick={handleDelete} className='deleteBtn'>Delete</button>
    </div>
  );
};

export default TicketCard;
