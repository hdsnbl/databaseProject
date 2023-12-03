import React from 'react';
import axios from 'axios';

const DeleteUser = ({ flaskUrl, userId }) => {
  const handleDeleteUser = async () => {
    try {
      // Delete associated reviews
      await axios.delete(`${flaskUrl}/reviews/user/${userId}`);
      
      // Delete associated favorites
      await axios.delete(`${flaskUrl}/favorites/user/${userId}`);
      
      // Finally, delete the user
      const response = await axios.delete(`${flaskUrl}/users/${userId}`);
      
      console.log(response.data.message); // Log the response message

      // You can also update the UI as needed after successful deletion
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <form onSubmit={handleDeleteUser}>
      <div>
        <button type="submit">Delete User</button>
      </div>
    </form>
  );
};

export default DeleteUser;
