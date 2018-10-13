import React, { Component } from 'react';
import queryString from 'query-string';
import { Redirect } from 'react-router';

class Callback extends Component {

  constructor(props){
    super(props);
    this.state = {
      loggedIn: false
    }
    this.stateKey = 'spotify_auth_state'
    console.log(queryString.parse(props.location.hash));
  }

  componentDidMount() {
    const storedState = localStorage.getItem(this.stateKey);
    const { access_token, state } = queryString.parse(this.props.location.hash);

    if (access_token && (state == null || state !== storedState)) {
      alert('There was an error during the authentication');
    } else {
      localStorage.removeItem(this.stateKey);
      if (access_token) {
        localStorage.setItem('access_token', access_token);
        this.setState({ loggedIn: true});
      } 
    }
  }

  render(){
    return this.state.loggedIn ? (<Redirect to="/main"/>
  ) : (
    <div> Loading </div>
  )
  }
}

export default Callback;