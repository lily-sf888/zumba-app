import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Match, BrowserRouter, Link, Miss, Redirect } from 'react-router'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Dashboard from './protected/Dashboard'
import Favorites from './protected/Favorites'
import { logout } from '../helpers/auth'
import base, { baseAuth, ref } from '../base'

//user authentication
function MatchWhenAuthed ({component: Component, authed, ...rest}) {
  return (
    <Match
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function MatchWhenUnauthed ({component: Component, authed, ...rest}) {
  return (
    <Match
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}
//App is our parent component, this is where we set states, sync states
//and set up routes for the different children components
export default class App extends Component {

  constructor() {
    super()
    this.onStarClick = this.onStarClick.bind(this)
    this.loadMoreVideos = this.loadMoreVideos.bind(this)
    this.loadPreviousVideos = this.loadPreviousVideos.bind(this)
    this.deleteVideo = this.deleteVideo.bind(this)
  }

  state = {
    authed: false,
    loading: true,
    numVideos: 5,
    numStars: 0,
    state: {}
  }

  componentDidMount () {
    this.removeListener = baseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
          user: user
        })
      } else {
        this.setState({
          loading: false
        })
      }
    })

    this.ref = base.syncState('/', {
      context: this,
      state: 'users'
    })
  }

  componentWillUnmount () {
    this.removeListener()
  }

  onStarClick(numStars, prevStars, id) {
    if(numStars > 3) {
      ref.child(`/users/${this.state.user.uid}/favorites`).update({[id]: numStars})
      this.setState({numStars})
    }
  }

  loadMoreVideos() {
    let numVideos  = this.state.numVideos
    numVideos += 5

    this.setState({ numVideos})
    console.log("start", numVideos)
  }

  loadPreviousVideos() {
    let numVideos  = this.state.numVideos
    numVideos -= 5
    this.setState({ numVideos })
  }

  // shouldComponentUpdate() {
  //   return this.state.numStars > 3 ? false : true;
  // }

  deleteVideo(videoId) {
    const uid = this.state.user.uid
    console.log("VIDEO ID", videoId)
    ref.child(`/users/${this.state.user.uid}/favorites/${videoId}`).remove()
    console.log("STATE", this.state)
  }
    
  render() {

    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        {({router}) => (
          <div>
            <nav className="navbar navbar-default navbar-fixed-top">
              <div className="container">
                <div className="navbar-header">
                  <Link to="/" className="navbar-brand"></Link>
                </div>
                <ul className="nav navbar-nav pull-right">
                  <li>
                    <Link to="/" className="navbar-brand">Home</Link>
                  </li>
                  <li>
                    <Link to="/dashboard" className="navbar-brand">Videos</Link>
                  </li>
                  <li>
                    <Link to="/favorites" className="navbar-brand">Favorites</Link>
                  </li>
                  <li>
                    {this.state.authed
                      ? <button
                          style={{border: 'none', background: 'transparent'}}
                          onClick={() => {
                            logout()
                            this.setState({authed: false})
                            router.transitionTo('/')
                          }}
                          className="navbar-brand">Logout</button>
                      : <span>
                          <Link to="/login" className="navbar-brand">Login</Link>
                          <Link to="/register" className="navbar-brand">Register</Link>
                        </span>}
                  </li>
                </ul>
              </div>
            </nav>
            <div className="container">
              <div className="row">
                <Match pattern='/' exactly component={Home} />
                <MatchWhenUnauthed authed={this.state.authed} pattern='/login' component={Login} />
                <MatchWhenUnauthed authed={this.state.authed} pattern='/register' component={Register} />
                <MatchWhenAuthed authed={this.state.authed} pattern='/dashboard'
                component={() => < Dashboard users={this.state.users} user={this.state.user}
                onStarClick={this.onStarClick} numVideos={this.state.numVideos}
                loadMoreVideos={this.loadMoreVideos} startVideos={this.state.startVideos}
                loadPreviousVideos={this.loadPreviousVideos} /> }
                />

                <MatchWhenAuthed authed={this.state.authed} pattern="/favorites" component={() => <Favorites
                data={this.state.users} user={this.state.user} deleteVideo={this.deleteVideo} /> } />

                <Miss render={() => <h3>No Match</h3>} />
              </div>
            </div>
          </div>
        )}
      </BrowserRouter>
    );
  }
}
