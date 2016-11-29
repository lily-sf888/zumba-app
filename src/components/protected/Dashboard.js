import React, { Component } from 'react'
import ReactYoutube from 'react-youtube'
import YouTube from 'youtube-node'
// export default class Dashboard extends Component {
//   constructor(props) {
//     super(props);
//     console.log('State', props)
//   }
//   render () {
//
//     return (
//       <div>
//         Dashboard. This is a protected route. You can only see this if you're authed.
//       </div>
//     )
//   }
// }

export default class Dashboard extends Component {
 render() {
   const opts = {
     height: '390',
     width: '640',
     playerVars: { // https://developers.google.com/youtube/player_parameters
       autoplay: 1
     }
   };

   return (
     <YouTube
       videoId="KInvRQX5TuM"
       opts={opts}
       onReady={this._onReady}
     />
   );
 }

 _onReady(event) {
   // access to player in all event handlers via event.target
   event.target.pauseVideo();
 }
}



// create a component to wrap all the videos
// create a component for individual videos
  // favorited video? Track that on the state.
