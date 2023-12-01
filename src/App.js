import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Col, Row, Card, Form, Button } from 'react-bootstrap';
// import Cookies from 'js-cookie';
import axios from 'axios';
import './App.css';
import AddToFavorites from './CRUD/addToFavorites';
import GameList from './gameList';
import GetAllReviews from './CRUD/getReviews';

const flaskUrl = "http://127.0.0.1:5000";
// const flaskUrl = "localhost:3000";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: 9,  // Replace with the actual user ID
        username: "User1",  // Replace with the actual username
        // Add other user properties as needed
      },
    };
  }

  render(){

    return (
    
      <div className="App" style={{display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Container fluid={true} style={{flex: '1' }}>
            <Row >
              <Col style={{paddingLeft: '20', paddingRight: '20' ,borderStyle:'solid'}}>
                <p style={{fontWeight: "bold", fontSize:"25px"}}>
                  Company Name
                </p>
              </Col>
              <Col style={{paddingLeft: '20', paddingRight: '20' ,borderStyle:'solid'}}>
                <GetAllReviews flaskUrl={flaskUrl}/>
              </Col>
              <Col style={{paddingLeft: '0', paddingRight: '0' }}>
                <div className="App-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem'}}>
                  <div style={{ borderStyle: 'solid', borderColor: 'gray', backgroundColor: 'gray'}}>
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
