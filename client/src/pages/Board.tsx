import { useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';

import auth from '../utils/auth';

const boardStates = ['Todo', 'In Progress', 'Done'];

const Board = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets();
      setTickets(data);
      setFilteredTickets(data);
    } catch (err) {
      console.error('Failed to retrieve tickets:', err);
      setError(true);
    }
  };

  const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId);
      fetchTickets();
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const grabUniqueUsernames = (): string[] => {
    const usernames: string[] = tickets
      .map((ticket) => ticket.assignedUser?.username)
      .filter((username): username is string => Boolean(username));
    const uniqueUsernames = [...new Set(usernames)];
    return uniqueUsernames;
  };

  const handleUserFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUsername = e.target.value;
    setSelectedUser(selectedUsername);

    if (selectedUsername) {
      const filtered = tickets.filter(
        (ticket) =>
          ticket.assignedUser &&
          ticket.assignedUser.username === selectedUsername
      );
      setFilteredTickets(filtered);
    } else {
      setFilteredTickets(tickets);
    }
  };

  const sortTicketsByUser = (ticketsToSort: TicketData[]): TicketData[] => {
    return ticketsToSort.sort((a, b) => {
      const userA = a.assignedUser?.username || '';
      const userB = b.assignedUser?.username || '';
      if (sortDirection === 'asc') {
        return userA.localeCompare(userB);
      } else {
        return userB.localeCompare(userA);
      }
    });
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortDirection = e.target.value as 'asc' | 'desc';
    setSortDirection(newSortDirection);
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (loginCheck) {
      fetchTickets();
    }
  }, [loginCheck]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {!loginCheck ? (
        <div className='login-notice'>
          <h1>Login to create & view tickets</h1>
        </div>
      ) : (
        <div className='board'>
          <Link to='/create'>
            <button type='button' id='create-ticket-link'>
              New Ticket
            </button>
          </Link>

          <div>
            <label className='filter-label' htmlFor='userFilter'>
              Assigned to
            </label>
            <select
              id='userFilter'
              value={selectedUser}
              onChange={handleUserFilter}
            >
              <option value="">All Users</option>
              {grabUniqueUsernames().map((username) => (
                <option key={username} value={username}>
                  {username}
                </option>
              ))}
            </select>
            <label className='sort-label' htmlFor='sortOrder'>
              {}
            </label>
            <select
              id='sortOrder'
              value={sortDirection}
              onChange={handleSortOrderChange}
              disabled={selectedUser !== ""}
            >
              <option value='asc'>Ascending</option>
              <option value='desc'>Descending</option>
            </select>
          </div>
          <div className='board-display'>
            {boardStates.map((status) => {
              const filtered = filteredTickets.filter(
                (ticket) => ticket.status === status
              );
              const sortedTicketsForStatus = sortTicketsByUser(filtered);
              return (
                <Swimlane
                  title={status}
                  key={status}
                  tickets={sortedTicketsForStatus}
                  deleteTicket={deleteIndvTicket}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Board;
