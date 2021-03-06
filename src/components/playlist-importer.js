import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import Playlist from './playlist';

/**
 * This class enables the users to import additional
 * playlists based on a copy-pasted URI or just drag'n'drop
 * them from Spotify
 */
class PlaylistImporter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            importedPlaylists: [],
            isLoading: false,
            addPlaylist: props.addPlaylist,
            inputString: ''
        }

        this.importPlaylist = this.importPlaylist.bind(this);
        this.onUriChanged = this.onUriChanged.bind(this);
        this.validateUri = this.validateUri.bind(this);
        this.onIconClicked = this.onIconClicked.bind(this);
    }

    render() {
        const playlistsContent = this.state.importedPlaylists.map((playlist_item) => {
            return <Playlist playlist_item={playlist_item}
                onIconClicked={this.onIconClicked}
                key={playlist_item.playlist.id} />
        });

        return (<div className="playlist-importer-content">
            <div className="playlist-header">Add playlists</div>
            <div className="playlist-importer">
                <span className="playlist-link-input-title">Copy playlist URI or Drag'n'Drop playlist here</span>
                <div className="playlist-link-input-box">
                    <input className="playlist-link-input" type="text" placeholder="Playlist link"
                        value={this.state.inputString}
                        onChange={this.onUriChanged} />
                    {this.state.isLoading
                        ? (<i className="fas fa-spinner playlist-link-input-icon loading-icon"></i>)
                        : (<i className="fas fa-search-plus playlist-link-input-icon"></i>)}
                </div>
            </div>
            <div className="playlist-container">
                {playlistsContent}
            </div>
        </div>)
    }

    onUriChanged(e) {
        e.preventDefault();
        let uri = e.target.value;
        this.setState({
            isLoading: true,
            inputString: uri
        });
        let validationResult = this.validateUri(uri);
        if (validationResult.isValid) {
            this.importPlaylist(validationResult.playlistId);
            this.setState({ inputString: '' });
        } else {
            this.setState({ isLoading: false });
        }
    }

    validateUri(uri) {
        let regex1 = new RegExp(/spotify:user:\S*:playlist:\S*/);
        let regex2 = new RegExp(/https:\/\/open.spotify.com\/user\/\S*\/\S*/);

        if (regex1.test(uri)) {
            let playlistId = uri.split(':')[4];
            return {
                playlistId: playlistId,
                isValid: true
            };
        } else if (regex2.test(uri)) {
            let playlistId = uri.split('.')[2].split('/')[4].split('?')[0];
            return {
                playlistId: playlistId,
                isValid: true
            };
        } else {
            return {
                isValid: false
            };
        }
    }

    importPlaylist(playlistId) {
        axios.get(config.server.host + '/findPlaylist', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            params: {
                playlistId: playlistId
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
            }
            this.setState({ isLoading: false });
        });
    }

    onIconClicked(playlist_item, newValue) {
        this.state.addPlaylist(playlist_item, newValue);
    }
}

export default PlaylistImporter;