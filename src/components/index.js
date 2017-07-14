import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Dashboard from './protected/Dashboard'
import Favorites from './protected/Favorites'
import { logout } from '../helpers/auth'
import base, { baseAuth } from '../base'

//user authentication, our parent component App gets rendered here
function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
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
  //we are accessing the different variables through state and passing them into context
  getChildContext() {
    return {
      data: this.state.users,
      user: this.state.user,
      numVideos: this.state.numVideos,
      startVideos: this.state.startVideos
    }
  }
  //setting the initial state for the properties
  state = {
    authed: false,
    loading: true,
    numVideos: 1,
    numStars: 0,
    state: {}
  }
  //after component mounts we set the different states, including syncState
  //which syncs our current states with the firebase database
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
  //rendering our components and routes for the different links
  //checking that some components are user authenticated
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
          <div>
            <nav className="navbar navbar-default navbar-fixed-top">
              <div className="container">
                <div className="navbar-header">
                  <Link to="/" className="navbar-brand"></Link>
                </div>
                <ul className="nav navbar-nav pull-right">
                  <li>
                    <Link to="/" className="navbar-brand">About</Link>
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

                          }}
                          className="navbar-brand">Logout</button>
                      : <span>
                          <Link to="/" className="navbar-brand">Login</Link>
                          <Link to="/register" className="navbar-brand">Register</Link>
                        </span>}
                  </li>
                </ul>
              </div>
            </nav>
            <div className="container">
              <div className="row">
                <Switch>
                  <Route path='/' exact component={Home} />
                  <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                  <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                  <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
                  <PrivateRoute authed={this.state.authed} path='/favorites' component={Favorites} />
                  <Route render={() => <h3>No Match</h3>} />
                </Switch>
              </div>
            </div>
          </div>
      </BrowserRouter>
    );
  }
}

App.childContextTypes = {
  data: React.PropTypes.object,
  user: React.PropTypes.object,
  numVideos: React.PropTypes.number,
  startVideos: React.PropTypes.object
}
