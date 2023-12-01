import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetUserById = ({ flaskUrl, userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${flaskUrl}/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        // Handle the error, e.g., show an error message to the user
        setUser(null);
      }
    };

    fetchUser();
  }, [flaskUrl, userId]);

  return (
    <div>
      <h2>User Details</h2>
      {user ? (
        <div>
          <p>ID: {user.id}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>No user found with ID {userId}</p>
      )}
    </div>
  );
};

export default GetUserById;
