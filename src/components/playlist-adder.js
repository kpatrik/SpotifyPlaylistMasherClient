import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import Playlist from './playlist';

class PlaylistAdder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            importedPlaylists: [],
            inputPlaylistId: '',
            inputIsValid: false,
            isLoading: false,
            addPlaylist: props.addPlaylist
        }

        this.onImportPlaylist = this.onImportPlaylist.bind(this);
        this.onUriChanged = this.onUriChanged.bind(this);
    }

    render() {
        const playlistsContent = this.state.importedPlaylists.map((playlist_item) => {
            return <Playlist playlist_item={playlist_item}
                onIconClicked={this.onIconClicked} />
        });

        return (<div className="playlist-adder-content">
            <div className="playlist-header">Add playlists</div>
            <div className="playlist-adder">
                <span className="playlist-link-input-title">Copy playlist link here</span>
                <div className="playlist-link-input-box">
                    <input className="playlist-link-input" type="text" placeholder="Playlist link"
                        onChange={this.onUriChanged} />
                    {this.state.isLoading
                        ? (<i className="fas fa-spinner playlist-link-input-icon loading-icon"></i>)
                        : (<i onClick={this.onImportPlaylist} className="fas fa-search-plus playlist-link-input-icon"></i>)}
                </div>
            </div>
            <div className="playlist-container">
                {playlistsContent}
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

    onImportPlaylist(event) {
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
                    this.setState(prevState => ({
                        importedPlaylists: [...prevState.importedPlaylists, {
                            playlist: res.data.playlist,
                            isAdded: true,
                            key: res.data.playlist.id
                        }]
                    }));
                    this.setState({ isLoading: false });
                }
            });
        } else {
            // let the user know that the link isnt valid
        }
    }

    onIconClicked(playlist_item) {
        console.log("onIconClicked called from + " + playlist_item.playlist.name);
    }
}

export default PlaylistAdder;