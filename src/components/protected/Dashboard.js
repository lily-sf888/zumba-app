import React, { Component } from 'react'
import YouTube from 'react-youtube'

class VideoWrapper extends Component {
  render () {
    return (
      <div><YouTube /></div>
    )
  }
}

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };
    return (
      //checking that users have signed in, then mapping over the youtube api
      //extracting the ids and inject them into the YouTube component
      <div>
        {this.props.users?
        <div>{this.props.users.youtube.videoIds.map(video =>
        <VideoWrapper key={video}>
        <YouTube videoId={video}
         opts={opts} onReady={this._onReady} />
        </VideoWrapper>
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
