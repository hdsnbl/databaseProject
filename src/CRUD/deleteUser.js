import React, { useState } from 'react';
import axios from 'axios';

const DeleteUser = ({ flaskUrl, userId }) => {
  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(`${flaskUrl}/users/${userId}`);
      console.log(response.data.message); // Log the response message
      // You can also update the UI as needed
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    // <form onSubmit={handleDeleteUser}>
    //   <div>
    //     {/* Button to delete the user */}
    //     <button type="submit">Delete User</button>
    //   </div>
    // </form>
      <div>
        <button onClick={handleDeleteUser}>Delete User</button>
      </div>
  );
};

export default DeleteUser;
