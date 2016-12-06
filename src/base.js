import Rebase from 're-base'

const base = Rebase.createClass({
  apiKey: "AIzaSyA78m9MZoHyvSSHLetMXxi5FCPQVUNdCLI",
  authDomain: "zumba-4dba2.firebaseapp.com",
  databaseURL: "https://zumba-4dba2.firebaseio.com"
})

export const ref = base.database().ref()
export const baseAuth = base.auth
export default base
