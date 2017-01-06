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
  let filteredFavorites = []

  if(this.context.data && this.context.user) {
   uid = this.context.user.uid
   const favorites = this.context.data.users[uid].favorites
   if(favorites) {favoritesAvail = true
     // filter all videos to only have > 4 stars
     filteredFavorites = Object.keys(favorites).filter(function(id) {
       return favorites[id] > 3 ? true : false
     })
   }
  }
    //this is where we render our favorite ReactPlayer component
    //we are only mapping over the filtered favorites 4 stars and above
    return (
      <div>
        <h1>Favorites</h1>
        {this.context.data && this.context.user && favoritesAvail ?
        <div>
          {filteredFavorites
            .map(id => {
              return (
                <div key={id} className="text-center">
                  <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${id}`}
                  style={{float:'left'}}
                  controls={true} 
                  />
                  <div>
                    <button onClick={this.deleteVideo.bind(null, id)} type="button" className="btn btn-danger">Delete</button>
                  </div>
                </div>
              )
          })}
          </div>
        : <div className="center">Loading...<br /><br />Rate your favorite videos 4 or 5 stars in the videos page and they will appear here.</div>}
      </div>
  )
}
 }
//storing our context types for the different variables
 Favorites.contextTypes = {
   data: React.PropTypes.object,
   user: React.PropTypes.object
 }
