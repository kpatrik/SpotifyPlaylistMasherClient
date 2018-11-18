import React, { Component } from 'react';
import PlaylistPicker from './playlist-picker';
import PlaylistAdder from './playlist-adder';
import PlaylistMasher from './playlist-masher';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playlists: []
    }

    this.onModifyPlaylists = this.onModifyPlaylists.bind(this);
  }

  onModifyPlaylists(playlist, newValue) {
    // add or remove
  }

  render() {
    return <div className="App">
      <PlaylistPicker />
      <PlaylistAdder />
      <PlaylistMasher playlists={this.state.playlists} />
    </div>
  }
}

export default Main;