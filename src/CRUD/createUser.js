import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = ({ flaskUrl }) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleCreateUser = async () => {
    try {
      const response = await axios.post(`${flaskUrl}/users`, userData);
      console.log('User created successfully:', response.data);
    } catch (error) {
      console.error('Error creating user:', error);
      // Log the detailed Axios error
      console.log('Axios Error Details:', error.response);
    }

    // Reload the page or update the UI as needed
    window.location.reload();
  };

  return (
    <div>
      <h3>Create a New User</h3>
      <form>
        <label>Username:</label>
        <input type="text" name="username" value={userData.username} onChange={handleInputChange} />

        <label>Email:</label>
        <input type="email" name="email" value={userData.email} onChange={handleInputChange} />

        <label>Password:</label>
        <input type="password" name="password" value={userData.password} onChange={handleInputChange} />

        <button type="button" onClick={handleCreateUser}>
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
