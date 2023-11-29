import React, { useState } from 'react';
import axios from 'axios';


const CreateReview = ( {flaskUrl }) => {

  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');
  const [gameId, setGameId] = useState(''); // You should get the game_id from somewhere
  const [userId, setUserId] = useState(''); // You should get the user_id from somewhere

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
      <button onClick={handleCreateReview}>Create Review</button>
    </div>
  );
};

export default CreateReview;





// import React from 'react';
// import axios from 'axios';
// import Button from 'react-bootstrap/Button';

// export default class createReview extends React.Component {
//   constructor(props) {
//     super(props);

//     this.createReview = this.createReview.bind(this); //Check this once backend is created
//   }

//   createReview() {
//     axios.post(`${this.props.flaskUrl}/categories`) //Check this as well

//     .then(response => {
//       console.log(response.data);
//     })
//     .catch(error => {
//       console.error(error);
//     });

//     //this.props.modalOpen();

//     window.location.reload();
//   }

//   // modalOpen() {
//   //   const temp = !this.state.displayModal;
//   //   this.setState({displayModal: temp})
//   // }

//   render() {
//     return(
//       <Button type="submit" onClick={this.createReview} style={{backgroundColor:'red', border:'none', width: 200, margin: 20}}>Create Review</Button>
//     )
//   }
// }