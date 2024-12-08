import React, { useState, useEffect } from 'react';
import '../styles/eventsPage.css';
function EventManagement() {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ name: '', date: '', location: '', status: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const authData = localStorage.getItem('auth');
        const { token } = authData ? JSON.parse(authData) : {};
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`http://localhost:3005/events?${queryParams}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        setEvents(data.events);
        console.log(data);
      } catch (err) {
        setError('Error fetching events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filters]);

  const handleStatusChange = async (eventId, newStatus) => {
    try {
        const authData = localStorage.getItem('auth');
        const { token } = authData ? JSON.parse(authData) : {};
      const response = await fetch(`http://localhost:3005/change-event-status/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      setEvents(events.map(event => event._id === eventId ? { ...event, status: newStatus } : event));
    } catch (err) {
      setError('Error updating event status');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`/api/delete-event/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setEvents(events.filter(event => event._id !== eventId));
    } catch (err) {
      setError('Error deleting event');
    }
  };

  return (
    <div className="event-management-container">
      <h2>Event Management Dashboard</h2>

      <div className="filters">
        <input 
          type="text" 
          placeholder="Search by name" 
          value={filters.name} 
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <input 
          type="date" 
          value={filters.date} 
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
        <input 
          type="text" 
          placeholder="Search by location" 
          value={filters.location} 
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        <select 
          value={filters.status} 
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>{event.description}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.location}</td>
                <td>{event.status}</td>
                <td>
                  {event.status === 'draft' && (
                    <button onClick={() => handleStatusChange(event._id, 'approved')}>Approve</button>
                  )}
                  {event.status === 'approved' && (
                    <button onClick={() => handleStatusChange(event._id, 'rejected')}>Reject</button>
                  )}
                  <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EventManagement;
