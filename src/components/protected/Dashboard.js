import React, { Component } from 'react'
import YouTube from 'react-youtube'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render () {

    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return (
      <div>
      {this.props.users
        ?
        <div>{this.props.users.youtube.videoIds.map(video => <YouTube videoId={video}
          key={video} opts={opts} onReady={this._onReady} />
        )}</div>

        : <div>Loading Videos....</div>
      }
      </div>
    )
  }
}

// create a component to wrap all the videos
// create a component for individual videos
  // favorited video? Track that on the state.
