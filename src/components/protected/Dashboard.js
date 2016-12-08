import React, { Component } from 'react'
import YouTube from 'react-youtube'
import StarRatingComponent from 'react-star-rating-component'
import { ref } from '../../base'



export default class Dashboard extends Component {

    constructor(props) {
    super(props)
    if(this.props.user){
    let uid = this.props.user.uid
  }
  }

  onStarClick(nextValue, prevValue, name) {
      // capture number of stars and write code to put it into firebase


      ref.child(`/users/${this.uid}/favorites`).update({[name]: nextValue})
  }

  render () {

    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 0
      }
    }



    return (
      //checking that users have signed in, then mapping over the youtube api
      //extracting the ids and inject them into the YouTube component
      <div>
        {this.props.users?
        <div id="video-position">
        <h1 id="zumba-title">Get Your Zumba On!</h1>
          {this.props.users.youtube.videoIds.map(id => {

            return (
              <div key={id}>
                  <YouTube videoId={id} opts={opts} />
                  <div>
                   <h4>Rate this video</h4>
                    <StarRatingComponent
                      name={id}
                      starCount={5}
                      value={5}
                      onStarClick={this.onStarClick.bind(this)}
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
