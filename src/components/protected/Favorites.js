import React, { Component } from 'react'
import ReactPlayer from 'react-player'
//import YouTube from 'react-youtube'

export default class Favorites extends Component {

  _onReady(event) {
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
        {this.props.data && this.props.user ?
          <div>
          {Object.keys(this.props.data.users[this.props.user.uid].favorites)
            .map(id => {
              return (
                <div key={id} className="text-center">
                  <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} />
                  <div>
                  <button type="button" className="btn btn-danger">Delete</button>
                  </div>
                </div>
              )
          })}
          </div>
        : <div>Loading....</div>}
      </div>
  )
}
 }
