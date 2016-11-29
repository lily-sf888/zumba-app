import { ref, baseAuth } from '../base'
import youTube from '../youtube-test.js'

export function auth (email, pw) {
  return baseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
    .catch((error) => console.log('Oops', error))
}

export function logout () {
  return baseAuth().signOut()
}

export function login (email, pw) {
  return baseAuth().signInWithEmailAndPassword(email, pw)
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid,
      zumbas: []
    })
    .then(() => user)
}
