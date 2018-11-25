import React, { Component } from 'react';
import axios from 'axios';

import config from '../config';
import Track from './track';

/**
 * This class is responsible for displaying the input parameters
 * of the desired playlist (name, number of tracks) and when the 
 * playlist is created, its tracks
 */
class PlaylistCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            numberOfTracks: 10,
            tracks: []
        }

        this.onCreatePlaylist = this.onCreatePlaylist.bind(this);
    }

    render() {
        const tracksToRender = this.state.tracks.map((item) => (
            <Track track={item.track} count={item.count} key={item.track.id}></Track>
        ))

        return (<div className="playlist-creator-content">
            <div className="playlist-header">Playlist Creator</div>
            <div className="playlist-creator-input">
                <div className="playlist-creator-input-field playlist-creator-name-input">
                    <label htmlFor="playlist-name">Playlist name: </label>
                    <input id="playlist-name" placeholder="Type playlist name..." name="name"
                        type="text" onChange={this.handleInputChange} defaultValue={this.state.name}></input>
                </div>
                <div className="playlist-creator-input-field playlist-creator-count-input">
                    <label htmlFor="track-count">Number of tracks: </label>
                    <input id="track-count" name="numberOfTracks" type="number" step="10" min="10" onChange={this.handleInputChange} defaultValue={this.state.numberOfTracks}></input>
                </div>
                <div className="btn mash-btn" onClick={this.onCreatePlaylist}>MASH</div>
            </div>
            <div className="playlist-creator-added-tracks">
                {tracksToRender}
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
        axios.post(config.server.host + '/createplaylist',
            {
                playlistIds: this.props.playlists.map(item => item.key),
                name: this.state.name,
                numberOfTracks: this.state.numberOfTracks
            },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                params: {
                    access_token: localStorage.getItem('access_token')
                }
            }).then((res) => {
                this.setState({ tracks: res.data.tracks });
            })
    }
}

export default PlaylistCreator;