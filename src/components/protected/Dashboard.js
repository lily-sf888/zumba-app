import React, { Component } from 'react'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log('State', props)
  }
  render () {

    return (
      <div>
        Dashboard. This is a protected route. You can only see this if you're authed.
      </div>
    )
  }
}


// create a component to wrap all the videos
// create a component for individual videos
  // favorited video? Track that on the state.
