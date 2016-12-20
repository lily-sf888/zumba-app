##Zumba App with React Router and Firebase

###Tech Stack

* React
* Firebase
* ES6
* Babel
* Webpack

With our [Zumba App](https://tranquil-ravine-98658.herokuapp.com/) user
authentication, register and login/logout functionality is done through Firebase.
[Firebase](https://firebase.google.com/) is a mobile and web application platform
provided by Google. One of it's best features is a realtime database, which allows
developers to store and sync data across multiple clients.

The Zumba App is build and written in ES6 and React.  We pull data from the YouTube
API, store the necessary data in Firebase and build the different parts of the app
with React components.  State is synced with our Firebase database, so whenever the
user makes a change in the app or the database, state is synced from both ends.

Our users can scroll through different YouTube videos and rate them from one to
five stars.  The videos that are rated four stars and above get saved in the
Favorites page. 



# Auth with React Router V4 and Firebase V3
This is an example repo for authenticating with Firebase and React Router.

*Using React 15.4.0, React Router 4, and Firebase 3.6.1*

#### Features:
* Protected Routes with React Router
* Register new users with Firebase
* Add new users to ```/users``` in your Firebase database
* Login/Logout Functionality
* Simple Boostrap UI
