import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = ({ flaskUrl }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateUser = async () => {
    try {
      const response = await axios.post(`${flaskUrl}/users`, {
        username,
        email,
        password,
      });

      console.log(response.data.message); // Log the response message
      // You can also reset the form or update the UI as needed
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    
      
    <form onSubmit={handleCreateUser}>
      <div>
        <h3>Create a New User:</h3>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Create User</button>
    </div>
  </form>
  );
};

export default CreateUser;
