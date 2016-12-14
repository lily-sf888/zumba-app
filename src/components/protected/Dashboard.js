import React, { Component } from 'react'
import StarRatingComponent from 'react-star-rating-component'
import { ref } from '../../base'
// import YouTubeWrapper from './YouTubeWrapper'
import YouTube from 'react-youtube'


export default class Dashboard extends Component {

  constructor(props) {
    super(props)
    if(this.props.user){
      let uid = this.props.user.uid
    }
  }

  shouldComponentUpdate() {
    return false
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  handleClick() {

    ref.child(`youtube`).once('value', function(snapshot) {
      var ids = snapshot.val()
      console.log('ids', ids.videoIds)
    })
  }

  render () {

    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1
      }

    }
    return (
      //checking that users have signed in, then mapping over the youtube api
      //extracting the ids and inject them into the YouTube component
      <div>
        <div><button type="button" onClick={this.handleClick} className="btn btn-default btn-lg">
        Load more videos</button></div>
        {this.props.users?
        <div id="video-position">
          <h1 id="zumba-title">Get Your Zumba On!</h1>
          {this.props.users.youtube.videoIds.slice(0, 5).map(id => {
            return (
              <div key={id} className="text-center">
                  <YouTube videoId={id} opts={opts} onReady={this._onReady}/>
                  <div>
                   <h4>Rate this video</h4>
                    <StarRatingComponent
                      name={id}
                      starCount={5}
                      value={5}
                      onStarClick={this.props.onStarClick}
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
