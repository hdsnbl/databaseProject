import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetAllUsers = ({ flaskUrl }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${flaskUrl}/users`);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle the error, e.g., show an error message to the user
        setUsers([]);
      }
    };

    fetchUsers();
  }, [flaskUrl]);

  return (
    <div>
      <h3>All Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            ID: {user.id}, Username: {user.username}, Email: {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllUsers;
