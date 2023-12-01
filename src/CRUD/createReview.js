import React, { useState } from 'react';
import axios from 'axios';


const CreateReview = ( {flaskUrl, gameId, userId }) => {

  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');
  //const [gameId, setGameId] = useState(''); // You should get the game_id from somewhere
  //const [userId, setUserId] = useState(''); // You should get the user_id from somewhere

  const handleCreateReview = async () => {
    try {
      const response = await axios.post(`${flaskUrl}/reviews`, {
        rating,
        comments,
        game_id: gameId,
        user_id: userId,
      });

      console.log(response.data.message); // Log the response message
      // You can also reset the form or update the UI as needed
    } catch (error) {
      console.error('Error creating review:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <form onSubmit={handleCreateReview}>
      <div>
        {/* Your form inputs go here */}
        <label>
          Rating:
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
        </label>
        <label>
          Comments:
          <input type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
        </label>
        {/* Add more input fields for gameId and userId if needed */}

        {/* Button to submit the form */}
        <button type="submit" >Create Review</button>
      </div>
    </form>
    
  );
};

export default CreateReview;