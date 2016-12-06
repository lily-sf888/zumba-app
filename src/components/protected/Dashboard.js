import React, { Component } from 'react'
import YouTube from 'react-youtube'
import ReactStars from 'react-stars'
import { ref } from '../../base'

export default class Dashboard extends Component {
  // constructor(props) {
  //   super(props);
  // }


  render () {
    let uid

    if(this.props.user) {
      uid = this.props.user.uid
      // console.log("USER ID", uid)
      // console.log("USERS", this.props.users)
    }

    const videoRender = function(id) {
      //console.log('currentId', id)
      const opts = {
        height: '390',
        width: '640',
        playerVars: {
        autoplay: 0
        }
      }

      const ratingChanged = function(newRating) {

        console.log("NewRating", newRating)
        ref.child(`/users/${uid}/favorites`).set({[id]: newRating})
      };

      // set the stars to the value in the state or 0
      // numStars={this.props.users[uid].favorites[id] || 0}
      return (

          <div key={id}>
              <YouTube videoId={id} opts={opts} />
              <ReactStars
              count={5}

              onChange={ratingChanged}

              size={24}
              color2={'#ffd700'} />
              <span>Rate this video</span>
          </div>


      )
    }

    return (
      //checking that users have signed in, then mapping over the youtube api
      //extracting the ids and inject them into the YouTube component
      <div>
        {this.props.users?
        <div>
          {this.props.users.youtube.videoIds.map(id => {
            return videoRender(id)
          })}
        </div>
        : <div>Loading Videos....</div>
       }
      </div>
    )
  }

}
