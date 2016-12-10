import React, { Component } from 'react'
import '../youtube'

export default class Home extends Component {

  render () {

    return (
      <div>
        <h1>Let's Zumba!</h1>
        <blockquote className="text-left">
        <h3>About Zumba App</h3>
        Zumba is a fast paced fitness program inspired by various styles of
        Latin American dance.  It can also contain everything from jazz to
        African beats, country, hip hop and pop.  It's the perfect combo of fun
        and fitness that is popular world-wide.  In our Zumba App the user is
        able to scroll through different zumba videos pulled from the YouTube
        api and rate them from one to five stars. The videos that are rated four
        stars and above get saved in the favorites page for each registered user.
        So what are we waiting for? Let's zumba!
        </blockquote>
      </div>
    )
  }
}
