import React, { Component } from 'react';

class PlaylistMasher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addedPlaylists: props.playlists
        }
    }
    render() {
        return (<div>MASHER</div>)
    }
}

export default PlaylistMasher;