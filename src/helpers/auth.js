import { ref, baseAuth } from '../base'

export function auth (email, pw) {
  return baseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
    .catch((error) => alert(error.message))
}

export function logout () {
  return baseAuth().signOut()
}

export function login (email, pw) {
  return baseAuth().signInWithEmailAndPassword(email, pw)
                   .catch((error) => alert(error.message))
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
