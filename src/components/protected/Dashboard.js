import React, { Component } from 'react'
import YouTube from 'react-youtube'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  //map over youtube component and render videos on screen
  render () {
    console.log("STATE", this.props)
    return (
      <div>
      {this.props.users
        ? <div>Rendering Videos</div>
        : <div>Loading Videos....</div>
      }
      </div>
    )
  }
}



// create a component to wrap all the videos
// create a component for individual videos
  // favorited video? Track that on the state.
