import React, { useState } from 'react';
import axios from 'axios';

const DeleteUser = ({ flaskUrl, userId }) => {
  const handleDeleteUser = async () => {
    
    try {
      await axios.delete(`${flaskUrl}/users/${userId}/reviews`);
      //deleting the reviews from that user
      await axios.delete(`${flaskUrl}/users/${userId}/favorites`);
      //deleting the favorites of that user

      const response = await axios.delete(`${flaskUrl}/users/${userId}`);
      console.log(response.data.message); // Log the response message
      // You can also update the UI as needed
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
     <form onSubmit={handleDeleteUser}>
        <div>
         <lable htmlFor="username">Username:</lable>
         <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div>
            <button type="submit">Delete User</button>
          </div>    
          <div>
            <button onClick={handleDeleteUser}>Delete User</button>   
          </div>
      </form>

  );
};

export default DeleteUser;
