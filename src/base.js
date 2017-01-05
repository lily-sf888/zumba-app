import Rebase from 're-base'
//we are using re-base to manage different states between our React components
//and Firebase, this makes it easier to sync states while using ES6 classes
const base = Rebase.createClass({
  apiKey: "AIzaSyA78m9MZoHyvSSHLetMXxi5FCPQVUNdCLI",
  authDomain: "zumba-4dba2.firebaseapp.com",
  databaseURL: "https://zumba-4dba2.firebaseio.com"
})

export const ref = base.database().ref()
export const baseAuth = base.auth
export default base
