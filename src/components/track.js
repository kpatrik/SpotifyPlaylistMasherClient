import React, { Component } from 'react';

class Track extends Component {
    constructor(props) {
        super(props);
        this.state = {
            track: props.track,
            count: props.count
        }
    }

    render() {
        let artists = this.state.track.artists.map(a => a.name).join(', ');
        return (<div className="track-li">
            <img src={this.state.track.album.images[0].url} className="track-li-image" />
            <div className="track-li-name">{artists + ': ' + this.state.track.name}</div>
            <div className="track-li-freq">Frequency: {this.state.count} </div>
        </div>)
    }
}

export default Track;