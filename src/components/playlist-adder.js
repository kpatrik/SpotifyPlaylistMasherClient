import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';

class PlaylistAdder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addedPlaylists: [],
            inputPlaylistId: '',
            inputIsValid: false,
            isLoading: false
        }

        this.onAddPlaylist = this.onAddPlaylist.bind(this);
        this.onUriChanged = this.onUriChanged.bind(this);
    }

    render() {
        return (<div className="playlist-adder-content">
            <div className="playlist-header">Add playlists</div>
            <div className="playlist-adder">
                <span className="playlist-link-input-title">Copy playlist link here</span>
                <div className="playlist-link-input-box">
                    <input className="playlist-link-input" type="text" placeholder="Playlist link"
                        onChange={this.onUriChanged} />
                    {/* this needs to be dynamic */this.state.isLoading 
                        ? (<i className="fas fa-spinner playlist-link-input-icon loading-icon"></i>) 
                        : (<i onClick={this.onAddPlaylist} className="fas fa-search-plus playlist-link-input-icon"></i>)}
                </div>
            </div>
        </div>)
    }

    onUriChanged(e) {
        this.setState({ isLoading: true });
        let uri = e.target.value;
        let inputParts = uri.split(':');
        if (inputParts.length != 5) {
            this.setState({ inputIsValid: false });
        } else {
            let id = inputParts[4];
            this.setState({ inputIsValid: true });
            this.setState({ inputPlaylistId: id });
        }
        this.setState({ isLoading: false });
    }

    onAddPlaylist(event) {
        event.preventDefault();
        console.log(this.state.inputPlaylistId);
        if (this.state.inputIsValid) {
            this.setState({ isLoading: true });
            axios.get(config.server.host + '/findPlaylist', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                params: {
                    playlistId: this.state.inputPlaylistId
                }
            }).then((res, err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                    this.setState({ isLoading: false });
                }
            });
        } else {
            // let the user know that the link isnt valid
        }
    }
}

export default PlaylistAdder;