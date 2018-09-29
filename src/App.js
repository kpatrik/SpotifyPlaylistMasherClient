import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(){
    super();
    this.state = {
      response: ""
    }
  }

  componentWillMount() {
    axios.get('http://localhost:3001', { headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }})
      .then((response) => {
        console.log(response);
        this.setState({response: response.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Sportify Playlist Masher</h1>
        </header>
        <p className="App-intro">
          The response from the server: {this.state.response}
        </p>
      </div>
    );
  }
}

export default App;
