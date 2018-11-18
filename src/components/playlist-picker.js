import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';

class PlaylistPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
            user_id: ''
        }

        this.addPlaylist = this.addPlaylist.bind(this);
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
                    this.setState({ playlists: res.data.playlists });
                    this.setState({ user_id: res.data.owner_id });
                }
            }
        }
        )
    }

    addPlaylist(playlist, event) {
        event.preventDefault();
        console.log(playlist);
    }

    render() {
        const playlistsContent = this.state.playlists.map((playlist) => {
            let playlistContent = playlist.owner.id === this.state.user_id
                ? '' + playlist.name
                : '' + playlist.name + '\t(by: ' + playlist.owner.display_name + ')';

            return (
                <div className="playlist">
                    {playlistContent}
                    <i onClick={(e) => this.addPlaylist(playlist, e)} className="fas fa-plus-circle add-btn"></i>
                </div>)
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