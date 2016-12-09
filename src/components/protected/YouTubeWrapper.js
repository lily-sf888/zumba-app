import YouTube from 'react-youtube'

import React from 'react'

export default class YouTubeWrapper extends React.PureComponent {

  render () {

    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 0
      }
    }

    return (
      <YouTube videoId={this.props.id} opts={opts} />
    )
  }
}
