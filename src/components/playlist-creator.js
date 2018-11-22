import React, { Component } from 'react';

class PlaylistCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.onCreatePlaylist = this.onCreatePlaylist.bind(this);
    }

    render() {
        console.log("PlaylistMasher render() called. Playlists below: ");
        console.log(this.props.playlists);
        return (<div className="playlist-creator-content">
            <div className="playlist-creator-title">Playlist Creator</div>
            <div className="playlist-creator-input">
                <span className="playlist-creator-name-input">
                    <label for="playlist-name"></label>
                    <input id="playlist-name" type="text"></input>
                </span>
                <span className="playlist-creator-count-input">
                    <label for="track-count"></label>
                    <input id="track-count" type="number" step="10" min="10"></input>
                </span>
                <span className="playlist-creator-create-btn" onClick={this.onCreatePlaylist}></span>
            </div>
            <div className="playlist-creator-added-playlists">

            </div>
        </div>);
    }

    onCreatePlaylist(e) {
        e.preventDefault();
        console.log("Creating playlist for user...");
    }
}

export default PlaylistCreator;