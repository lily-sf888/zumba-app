import React, { Component } from 'react'
import StarRatingComponent from 'react-star-rating-component'
import { ref } from '../../base'
import ReactPlayer from 'react-player'

//this is where the list of youTube videos are pulled in from the API
export default class Dashboard extends Component {
  //binding our functions to the 'this' scope of our Dashboard component
  constructor() {
    super()
    this.onStarClick = this.onStarClick.bind(this)
    this.loadMoreVideos = this.loadMoreVideos.bind(this)
    this.loadPreviousVideos = this.loadPreviousVideos.bind(this)
  }
  //setting initial state of numVideos
  state = {
    numVideos: 1
  }
  //this pauses the video upon page load
  _onReady(event) {
    event.target.pauseVideo();
  }
  //storing user star rating in firebase
  onStarClick(numStars, prevStars, id) {
    const uid = this.context.user.uid
    ref.child(`/users/${uid}/favorites`).update({[id]: numStars})
    }
  //loads next video when user clicks on next button
  loadMoreVideos() {
    let numVideos  = this.state.numVideos
    numVideos += 1
    this.setState({ numVideos })
  }
  //loads previous video when user clicks on previous button
  loadPreviousVideos() {
    let numVideos  = this.state.numVideos
    numVideos -= 1
    this.setState({ numVideos })
  }

  render () {
    //make sure there's a user in the context and storing user id number
    let uid
    if(this.context.data && this.context.user) {
     uid = this.context.user.uid
    }
    //this is where our ReactPlayer and StarRating components get rendered
    //we are mapping through the youtube api data, extracting the video ids and
    //injecting the ids into our components so they can get rendered
    return (
      <div>
        {this.context.data && this.context.user ?
        <div id="video-position">
        <div className="zumba-title">Get Your Zumba On!</div>
          {this.context.data.youtube.videoIds.slice(this.state.numVideos -1, this.state.numVideos).map(id => {
          return (
            <div key={id} className="text-center">
                <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                controls={true}
                />
                <div>
                <ul className="pager">
                  <li className="previous"><a onClick={this.loadPreviousVideos}>Previous</a></li>
                  <li className="next"><a onClick={this.loadMoreVideos}>Next</a></li>
                </ul>
                 <h4>Rate this video</h4>
                  <StarRatingComponent
                    name={id}
                    starCount={5}
                    value={this.context.data.users[uid].favorites?
                    this.context.data.users[uid].favorites[id] || 0 : 0}
                    onStarClick={this.onStarClick}
                  />
                </div>
            </div>
          )
        })}
      </div>
      : <div className="center">Loading Videos....</div>
     }
     </div>
    )
  }
}

//setting context types for the different variables that are being passed
//down through context
Dashboard.contextTypes = {
  data: React.PropTypes.object,
  user: React.PropTypes.object,
  numVideos: React.PropTypes.number,
  startVideos: React.PropTypes.object
}
