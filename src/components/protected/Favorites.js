import React, { Component } from 'react'

import YouTube from 'react-youtube'

export default class Favorites extends Component {

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1
      }

    }

    return (
      <div>
        <h1>Favorites</h1>
        Hello from favorites
        {this.props.data && this.props.user ?
          <div>
          {Object.keys(this.props.data.users[this.props.user.uid].favorites)
            .map(id => {
              return (
                <div key={id} className="text-center">
                  <YouTube videoId={id} opts={opts} onReady={this._onReady}/>
                </div>
              )
          })}
          </div>
        : <div>Loading....</div>}
      </div>
  )
}
 }
