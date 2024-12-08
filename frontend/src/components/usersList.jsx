import React, { useState, useEffect } from 'react';
import '../styles/usersPage.css';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const authData = localStorage.getItem('auth');
        const { token } = authData ? JSON.parse(authData) : {};

        if (!token) {
          setError('No authorization token found');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:3005/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data.users);
        // console.log(data.users);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const authData = localStorage.getItem('auth');
      const { token } = authData ? JSON.parse(authData) : {};

      if (!token) {
        setError('No authorization token found');
        return;
      }

      const response = await fetch(`http://localhost:3005/assign-role/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error('Failed to update role');
      }

      setUsers(users.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const authData = localStorage.getItem('auth');
      const { token } = authData ? JSON.parse(authData) : {};

      if (!token) {
        setError('No authorization token found');
        return;
      }

      const response = await fetch(`http://localhost:3005/delete-user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="users-list-container">
      <h2>Users Dashboard</h2>
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.profile.firstName} {user.profile.lastName}</td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      >
                        <option value="attendee">Attendee</option>
                        <option value="organizer">Organizer</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => handleDeleteUser(user._id)} className="delete-btn">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UsersList;
