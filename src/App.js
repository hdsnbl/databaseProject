import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Col, Row, Card, Form, Button } from 'react-bootstrap';
// import Cookies from 'js-cookie';
import axios from 'axios';
import './App.css';

class App extends React.Component{
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
              <Col style={{paddingLeft: '0', paddingRight: '0' }}>
                <div className="App-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                  <div>
                    <Button style={{ backgroundColor: 'lightgrey', borderColor:'black', color: 'black', padding:'10px' }}>
                      Create
                    </Button>
                    <Button style={{ backgroundColor: 'lightgrey', borderColor:'black', color: 'black', marginLeft: '0.5rem', padding:'10px' }}>
                      Read
                    </Button>
                    <Button style={{ backgroundColor: 'lightgrey', borderColor:'black', color: 'black', marginLeft: '0.5rem', padding:'10px' }}>
                      Update
                    </Button>
                    <Button style={{ backgroundColor: 'lightgrey', borderColor:'black', color: 'black', marginLeft: '0.5rem', padding:'10px' }}>
                      Delete
                    </Button>
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
