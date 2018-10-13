import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import config from '../config';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playlists: []      
    }            
  }

  componentDidMount() {
    axios.get(config.server.host + '/playlists', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    }).then((res, err) => {
      if(err){
        console.log(err);
      } else {
        console.log(res);
        this.setState({ playlists: res.data});
      }
    }
    )
  }

  render() {
    const content = this.state.playlists.map((playlist => (<div> { playlist } </div>)));
    return <div> { content } </div>
  }
}

export default Main;