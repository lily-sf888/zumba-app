import React, { Component } from 'react'
import StarRatingComponent from 'react-star-rating-component'
import { ref } from '../../base'
//import YouTube from 'react-youtube'
import ReactPlayer from 'react-player'


export default class Dashboard extends Component {

  constructor(props) {
    super(props)
    if(this.props.user){
      let uid = this.props.user.uid
    }
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  // handleClick() {
  //
  //   ref.child(`youtube`).once('value', function(snapshot) {
  //     var ids = snapshot.val()
  //     console.log('ids', ids.videoIds)
  //   })
  // }

  shouldComponentUpdate() {
    return false;
  }


  render () {

    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1
      }

    }
    console.log("component rendered", this.props)
    return (
      //checking that users have signed in, then mapping over the youtube api
      //extracting the ids and inject them into the YouTube component
      <div>

      <ul className="pager">
        <li className="previous"><a onClick={this.props.loadPreviousVideos}>Previous</a></li>
        <li className="next"><a onClick={this.props.loadMoreVideos}>Next</a></li>
      </ul>

        {this.props.users?
        <div id="video-position">
          <h1 id="zumba-title">Get Your Zumba On!</h1>
          {this.props.users.youtube.videoIds.slice(this.props.startVideos, this.props.numVideos).map(id => {
            return (
              <div key={id} className="text-center">
                  <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} />
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
