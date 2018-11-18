import React, { Component } from 'react';
import PlaylistPicker from './playlist-picker';
import PlaylistAdder from './playlist-adder';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return <div className="App">
      <PlaylistPicker />
      <PlaylistAdder />
    </div>
  }
}

export default Main;