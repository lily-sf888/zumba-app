import React, { Component } from 'react'
import StarRatingComponent from 'react-star-rating-component'
import { ref } from '../../base'
//import YouTube from 'react-youtube'
import ReactPlayer from 'react-player'


export default class Dashboard extends Component {

  constructor() {
    super()
    this.onStarClick = this.onStarClick.bind(this)
    this.loadMoreVideos = this.loadMoreVideos.bind(this)
    this.loadPreviousVideos = this.loadPreviousVideos.bind(this)
  }

  state = {
    numVideos: 5
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  onStarClick(numStars, prevStars, id) {
    const uid = this.context.user.uid
    if(numStars > 3) {
      ref.child(`/users/${uid}/favorites`).update({[id]: numStars})
      //this.setState({numStars})
    }
  }

  loadMoreVideos() {
    let numVideos  = this.state.numVideos
    numVideos += 5
    console.log('numVideos', numVideos)
    this.setState({ numVideos})
  }

  loadPreviousVideos() {
    let numVideos  = this.state.numVideos
    numVideos -= 5
      console.log('numVideos', numVideos)
    this.setState({ numVideos })
  }

  render () {
    let uid

    if(this.context.data && this.context.user) {
     uid = this.context.user.uid
    }

    return (
      //checking that users have signed in, then mapping over the youtube api
      //extracting the ids and inject them into the YouTube component
      <div>
    
        <ul className="pager">
          <li className="previous"><a onClick={this.loadPreviousVideos}>Previous</a></li>
          <li className="next"><a onClick={this.loadMoreVideos}>Next</a></li>
        </ul>
        {this.context.data && this.context.user ?
          <div id="video-position">
          <h1 id="zumba-title">Get Your Zumba On!</h1>
          {this.context.data.youtube.videoIds.slice(this.state.numVideos -5, this.state.numVideos).map(id => {
            return (
              <div key={id} className="text-center">
                  <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} />
                  <div>
                   <h4>Rate this video</h4>
                    <StarRatingComponent
                      name={id}
                      starCount={5}
                      value={this.context.data.users[uid].favorites[id] || 0}
                      onStarClick={this.onStarClick}
                     />
                  </div>
              </div>
            )
          })}
        </div>
        : <div>Loading Videos....</div>
       }
    </div>
    )
  }
}
Dashboard.contextTypes = {
  data: React.PropTypes.object,
  user: React.PropTypes.object,
  numVideos: React.PropTypes.number,
  startVideos: React.PropTypes.object
}
