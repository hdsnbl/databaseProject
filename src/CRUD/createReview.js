import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateReview = ({ flaskUrl }) => {
  const [reviewData, setReviewData] = useState({
    rating: '',
    comments: '',
    game_id: '',
    user_id: '',
  });

  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch games and users when the component mounts
    const fetchGamesAndUsers = async () => {
      try {
        const gamesResponse = await axios.get(`${flaskUrl}/games`);
        setGames(gamesResponse.data.games);

        const usersResponse = await axios.get(`${flaskUrl}/users`);
        setUsers(usersResponse.data.users);

      console.log('Users:', usersResponse.data.users); 
      } catch (error) {
        console.error('Error fetching games and users:', error);
      }
    };

    fetchGamesAndUsers();
  }, [flaskUrl]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleCreateReview = async () => {
    try {
      const response = await axios.post(`${flaskUrl}/reviews`, reviewData);
      console.log('Review created successfully:', response.data);
    } catch (error) {
      console.error('Error creating review:', error);
      // Log the detailed Axios error
      console.log('Axios Error Details:', error.response);
    }

    // Reload the page or update the UI as needed
    //window.location.reload();
  };

  return (
    <div>
      <h3>Create a New Review</h3>
      <form>
        <label>Rating:</label>
        <input type="number" name="rating" value={reviewData.rating} onChange={handleInputChange} />

        <label>Comments:</label>
        <textarea name="comments" value={reviewData.comments} onChange={handleInputChange} />

        <label>Game:</label>
        <select name="game_id" value={reviewData.game_id} onChange={handleInputChange}>
          <option value="">Select a game</option>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.title}
            </option>
          ))}
        </select>

        <label>User:</label>
        <select name="user_id" value={reviewData.user_id} onChange={handleInputChange}>
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>

        <button type="button" onClick={handleCreateReview}>
          Create Review
        </button>
      </form>
    </div>
  );
};

export default CreateReview;
