import firebase from 'firebase'

export const config = {
  apiKey: "AIzaSyA78m9MZoHyvSSHLetMXxi5FCPQVUNdCLI",
  authDomain: "zumba-4dba2.firebaseapp.com",
  databaseURL: "https://zumba-4dba2.firebaseio.com"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
