import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import {ref} from '../../base'

//this is where the user's favorite videos get rendered
export default class Favorites extends Component {
  //binding our delete function to the 'this' scope of our Favorites component
  constructor() {
    super()
    this.deleteVideo = this.deleteVideo.bind(this)
  }

  _onReady(event) {
    event.target.pauseVideo();
  }
  //when user clicks on delete button, we access our firebase database and
  //remove it directly from there
  deleteVideo(videoId) {
    const uid = this.context.user.uid
    ref.child(`/users/${uid}/favorites/${videoId}`).remove()
  }

 render() {
  //if there is a favorites video available we store the user id
  let uid
  let favoritesAvail = false

  if(this.context.data && this.context.user) {
   uid = this.context.user.uid
   if(this.context.data.users[uid].favorites) favoritesAvail = true
  }

    //this is where we render our favorite ReactPlayer component
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
        : <div className="center">Loading...<br /><br />Rate your favorite videos 4 or 5 stars in the videos page and they will appear on this page.</div>}
      </div>
  )
}
 }
//storing our context types for the different variables
 Favorites.contextTypes = {
   data: React.PropTypes.object,
   user: React.PropTypes.object
 }
