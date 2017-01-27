##Let's Zumba with React Router and Firebase

###Tech Stack

* React
* Firebase
* ES6
* Babel
* Webpack
* Travis CI
* Heroku


<img src="zumba-demo.png" alt="zumba demo" style="width: 200px"

With our [Zumba App](https://tranquil-ravine-98658.herokuapp.com/) user
authentication, register and login/logout functionality is done through Firebase.
[Firebase](https://firebase.google.com/) is a mobile and web application platform
provided by Google. One of it's best features is a realtime database, which allows
developers to store and sync data across multiple clients.

The Zumba App is build and written in ES6 and React.  We pull data from the YouTube
API, store the necessary data in Firebase and build the different parts of the app
with React components.  State is synced with our Firebase database, so whenever the
user makes a change in the app or the database, state is synced from both ends.
Continuous deployment is done through Travis CI and Heroku.

Our users can scroll through different YouTube videos and rate them from one to
five stars.  The videos that are rated four stars and above get saved in the
favorites page.

This project was bootstrapped with [Auth with React Router V4 and Firebase V3](https://github.com/tylermcginnis/react-router-firebase-auth).
