import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Col, Row, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './App.css';
import GameList from './gameList';
import GetAllReviews from './CRUD/getReviews';
import GetAllFavorites from './CRUD/getAllFavorites';
import GetAllUsers from './CRUD/getAllUsers';
import GetGameById from './CRUD/getGameById';
import GetUserById from './CRUD/getUserById';
import CreateUser from './CRUD/createUser';
import CreateGame from './CRUD/createGames'; // Import the CreateGame component


const flaskUrl = "http://127.0.0.1:5000";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGameId: null,
      selectedUserId: null,
      user: {
        id: 16,  // Replace with the actual user ID
        username: "User1",  // Replace with the actual username
      },
    };
  }

  handleInputChange = (e) => {
    this.setState({ selectedGameId: e.target.value });
  };
  handleInputChangeUser = (e) => {
    this.setState({ selectedUserId: e.target.value });
  };

  render() {
    const { selectedGameId } = this.state;
    const { selectedUserId } = this.state;

    return (
    
      <div className="App" style={{display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Container fluid={true} style={{flex: '1' }}>
            <Row >
              <Col style={{paddingLeft: '20', paddingRight: '20' ,borderStyle:'solid'}}>
                <p style={{fontWeight: "bold", fontSize:"25px"}}>
                  Company Name
                </p>
                <CreateUser flaskUrl={flaskUrl} />
                <CreateGame flaskUrl={flaskUrl} /> {/* Include the CreateGame component */}
              </Col>
              <Col style={{ paddingLeft: '20', paddingRight: '20', borderStyle: 'solid' }}>
              
              <GetAllReviews flaskUrl={flaskUrl} />
              <GetAllFavorites flaskUrl={flaskUrl} />
              <GetAllUsers flaskUrl={flaskUrl} />
              </Col>
              <Col style={{paddingLeft: '20', paddingRight: '20' ,borderStyle:'solid'}}>
              <div>
                <div style={{fontWeight:"bold", padding: "5px", fontSize:"20px"}}>
                Search game by ID
                </div>
                <label>
                  Enter Game ID:
                  <input type="number" value={selectedGameId || ''} onChange={this.handleInputChange} />
                </label>
                <button onClick={() => this.setState({ selectedGameId })}>Search</button>
              </div>
              {selectedGameId && <GetGameById flaskUrl={flaskUrl} gameId={selectedGameId} />}

              <div>
                <div style={{fontWeight:"bold", padding: "5px", fontSize:"20px"}}>
                Search user by ID
                </div>
                <label>
                  Enter user ID:
                  <input type="number" value={selectedUserId || ''} onChange={this.handleInputChangeUser} />
                </label>
                <button onClick={() => this.setState({ selectedUserId })}>Search</button>
              </div>
              {selectedUserId && <GetUserById flaskUrl={flaskUrl} userId={selectedUserId} />}
              </Col>
              <Col style={{paddingLeft: '0', paddingRight: '0' }}>
                <div className="App-header" style={{ justifyContent: 'space-between', alignItems: 'center', padding: '1rem'}}>
                  <div style={{ borderStyle: 'solid', borderColor: 'black'}}>
                    <GameList flaskUrl={flaskUrl} userId={this.state.user.id}/>
                  </div>
                </div>    
              </Col>
              
            </Row>
          </Container>
        </div>
    );
  }
}

export default App;
