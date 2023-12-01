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
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            User ID: {user.id}, Username: {user.username}, Email: {user.email}
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllUsers;
