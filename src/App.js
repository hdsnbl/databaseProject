import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Col, Row, Card, Form, Button } from 'react-bootstrap';
// import Cookies from 'js-cookie';
import axios from 'axios';
import './App.css';
import AddToFavorites from './CRUD/addToFavorites';
import GameList from './gameList';

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

    // handleSubmit = async (e) => {
    //   e.preventDefault();
    //   const { name, color } = this.state;
  
    //   const data = {
    //     name,
    //     color,
    //   };
  
    //   try {
    //     const response = await axios.post(`${this.props.flaskUrl}/categories/${this.props.userId}`, data);
    //     this.props.onCategoryAdded(response.data.category_id);
    //   } catch (error) {
    //     console.error(error);
    //   }
  
    //   this.props.modalOpen();
    //   window.location.reload();
    // };

    return (
    
      <div className="App" style={{display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Container fluid={true} style={{flex: '1' }}>
            <Row >
              <Col style={{paddingLeft: '20', paddingRight: '20' ,borderStyle:'solid'}}>
                <p style={{fontWeight: "bold", fontSize:"25px"}}>
                  Company Name
                </p>
              </Col>
              <Col style={{paddingLeft: '0', paddingRight: '0' }}>
                <div className="App-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem'}}>
                  <div>
                    
                    {/* <div style={{ borderStyle: 'solid', borderColor: 'gray', backgroundColor: 'gray'}}>
                      <AddToFavorites flaskUrl={flaskUrl} />    
                      gameId={ provide the game_id } userId={ provide the user_id }     add this to the AddToFavorites once you know how to get game_id and user_id
                    </div> */}
                    <div style={{ borderStyle: 'solid', borderColor: 'gray', backgroundColor: 'gray'}}>
                      <GameList flaskUrl={flaskUrl} userId={this.state.user.id}/>
                    </div>
                    
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
