import React, { Component } from 'react'
import ReactPlayer from 'react-player'
//import YouTube from 'react-youtube'
import {ref} from '../../base'

export default class Favorites extends Component {
  constructor() {
    super()
    this.deleteVideo = this.deleteVideo.bind(this)
  }

  _onReady(event) {
    event.target.pauseVideo();
  }

  deleteVideo(videoId) {
    const uid = this.state.user.uid
    console.log("VIDEO ID", videoId)
    ref.child(`/users/${this.state.user.uid}/favorites/${videoId}`).remove()
    console.log("STATE", this.state)
  }

 render() {
  let uid
  let favoritesAvail = false

  if(this.context.data && this.context.user) {
   uid = this.context.user.uid
   if(this.context.data.users[uid].favorites) favoritesAvail = true
  }


    return (
      <div>
        <h1>Favorites</h1>
        {this.context.data && this.context.user && favoritesAvail ?
          <div>
          {Object.keys(this.context.data.users[uid].favorites)

            .map(id => {
              return (
                <div key={id} className="text-center">
                  <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} style={{float:'left'}} />
                  <div>
                    <button onClick={this.deleteVideo.bind(null, id)} type="button" className="btn btn-danger">Delete</button>
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

 Favorites.contextTypes = {
   data: React.PropTypes.object,
   user: React.PropTypes.object
 }
