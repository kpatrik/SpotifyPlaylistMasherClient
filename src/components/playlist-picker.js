import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import Playlist from './playlist';

class PlaylistPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
            userId: ''
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
                console.log(res);
                if (res.data.err !== undefined) {
                    // exception handilng (?)
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

    onIconClicked(playlist_item) {
        console.log("onIconClicked called from + " + playlist_item.playlist.name);
    }

    render() {
        const playlistsContent = this.state.playlists.map((playlist_item) => {
            return <Playlist playlist_item={playlist_item}
                onIconClicked={this.onIconClicked}
                userId={this.state.userId} />
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