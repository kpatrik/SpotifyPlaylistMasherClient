import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import Playlist from './playlist';

/**
 * This class is responsible for displaying the logged in
 * user's public playlists so the user can quickly choose
 * from them when creating a playlist
 */

class PlaylistPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
            userId: '',
            addPlaylist: props.addPlaylist
        }

        this.onIconClicked = this.onIconClicked.bind(this);
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
            if (err) {
                console.log(err);
            } else {
                if (res.data.err !== undefined) {
                    // exception handling (?)
                    console.log(res.data.err);
                } else {
                    let playlists = res.data.playlists.map((playlist) => {
                        return {
                            playlist: playlist,
                            isAdded: false,
                            key: playlist.id
                        }
                    })
                    this.setState({ userId: res.data.owner_id });
                    this.setState({ playlists: playlists });                    
                }
            }
        }
        )
    }

    onIconClicked(playlist_item, newValue) {
        this.state.addPlaylist(playlist_item, newValue);
    }

    render() {
        const playlistsContent = this.state.playlists.map((playlist_item) => {
            return <Playlist playlist_item={playlist_item}
                onIconClicked={this.onIconClicked}
                userId={this.state.userId}
                key={playlist_item.playlist.id} />
        });


        return (<div className="playlist-picker-content">
            <div className="playlist-header">
                Your public playlists
            </div>
            <div className="playlist-container">
                {playlistsContent}
            </div>
        </div>)
    }
}

export default PlaylistPicker;