import React, { Component } from 'react';
import axios from 'axios';
import logo from '../logo.png';
import './App.css';
import config from '../config';

class Login extends Component {

  constructor(){
    super();
    this.state = {
      response: "",
      stateKey: 'spotify_auth_state'
    }

    this.login = this.login.bind(this);
    this.generateRandomString = this.generateRandomString.bind(this);

  }

  componentWillMount() {
    axios.get(config.server.host, { headers: {
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
          <h1 className="App-title">Welcome to Spotify Playlist Masher</h1>
        </header>
        <p className="App-intro">
          The response from the server: {this.state.response}
        </p>
        <button onClick={this.login}>Login to spotify</button>
      </div>
    );
  }

  login() {
    var client_id = '0fe0e1bcd123469aaf69836f818b40ef'; // Your client id
    var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri

    var state = this.generateRandomString(16);

    localStorage.setItem(this.state.stateKey, state);
    var scope = 'user-read-private user-read-email';

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    window.location = url;
  }

  generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

}

export default Login;
