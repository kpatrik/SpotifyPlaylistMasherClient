import React, { Component } from 'react';

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: props.playlist_item.playlist,
            onIconClicked: props.onIconClicked,
            isAdded: props.playlist_item.isAdded,
            playlist_item: props.playlist_item,
            userId: props.userId
        }

        this.onIconClicked = this.onIconClicked.bind(this);

        // instant add when importing a playlist!
        if (props.playlist_item.isAdded) {
            props.onIconClicked(props.playlist_item, true);
        }
    }

    onIconClicked(playlist_item, event) {
        event.preventDefault();
        let isAdded = !this.state.isAdded;
        this.setState({ isAdded: isAdded });
        this.state.onIconClicked(playlist_item, isAdded);
    }

    render() {
        let playlistContent = (this.state.userId !== undefined && this.state.playlist.owner.id === this.state.userId)
            ? '' + this.state.playlist.name
            : '' + this.state.playlist.name + '\t(by: ' + this.state.playlist.owner.display_name + ')';
        let playlistClassNames = this.state.isAdded
            ? "playlist added-playlist"
            : "playlist";

        let iconClassNames = this.state.isAdded
            ? "fas fa-minus-circle playlist-btn remove-btn"
            : "fas fa-plus-circle playlist-btn add-btn";

        return (
            <div className={playlistClassNames} key={this.state.playlist.id}
                onClick={(e) => this.onIconClicked(this.state.playlist_item, e)} >
                {playlistContent}
                <i className={iconClassNames}></i>
            </div>)
    }
}

export default Playlist;