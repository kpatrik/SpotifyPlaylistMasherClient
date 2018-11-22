import React, { Component } from 'react';
import axios from 'axios';

import config from '../config';


class PlaylistCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            numberOfTracks: 10
        }

        this.onCreatePlaylist = this.onCreatePlaylist.bind(this);
    }

    render() {
        console.log("PlaylistMasher render() called. Playlists below: ", this.state);
        console.log(this.props.playlists);
        return (<div className="playlist-creator-content">
            <div className="playlist-header">Playlist Creator</div>
            <div className="playlist-creator-input">
                <span className="playlist-creator-name-input">
                    <label for="playlist-name">Playlist name: </label>
                    <input id="playlist-name" name="name" type="text" onChange={this.handleInputChange} defaultValue={this.state.name}></input>
                </span>
                <span className="playlist-creator-count-input">
                    <label for="track-count">Number of track: </label>
                    <input id="track-count" name="numberOfTracks" type="number" step="10" min="10" onChange={this.handleInputChange} defaultValue={this.state.numberOfTracks}></input>
                </span>
                <span className="btn mash-btn" onClick={this.onCreatePlaylist}>MASH</span>
            </div>
            <div className="playlist-creator-added-playlists">

            </div>
        </div>);
    }

    handleInputChange = (e) => {
        console.log(e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onCreatePlaylist = () => {
        console.log("Creating playlist for user...",this.state, this.props);
        axios.post(config.server.host + '/createplaylist',
        {
            playlistIds: this.props.playlists.map(item => item.key),
            name: this.state.name,
            numbnerOfTracks: this.state.numberOfTracks
        },
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            params: {
                access_token: localStorage.getItem('access_token')
            }
        })
    }
}

export default PlaylistCreator;