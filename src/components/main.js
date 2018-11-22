import React, { Component } from 'react';
import PlaylistPicker from './playlist-picker';
import PlaylistImporter from './playlist-importer';
import PlaylistCreator from './playlist-creator';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playlists: []
    }

    this.onModifyPlaylists = this.onModifyPlaylists.bind(this);
  }

  onModifyPlaylists(playlist, toAddPlaylist) {
    console.log(playlist);
    if (toAddPlaylist) {
      // newValue = true means we would like to add the playlist
      this.setState(state => {
        return {
          playlists: state.playlists.concat(playlist)
        }
      });
    } else {
      // newValue = false means we would like to remove the playlist
      this.setState(state => {
        return {
          playlists: state.playlists.filter((playlist_item) => {
            return playlist_item.key !== playlist.key;
          })
        }
      })
    }
  }

  render() {
    console.log("Main render() called. Playlists below: ");
    console.log(this.state.playlists.map((playlist_item) => playlist_item.playlist.name));
    return <div className="App">
      <PlaylistPicker addPlaylist={this.onModifyPlaylists} />
      <PlaylistImporter addPlaylist={this.onModifyPlaylists} />
      <PlaylistCreator playlists={this.state.playlists} />
    </div>
  }
}

export default Main;