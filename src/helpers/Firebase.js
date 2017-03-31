import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyBClQ0-3LBYGgTE4Z5O_eWustSoikQ9HFQ",
    authDomain: "tripplanner-9c647.firebaseapp.com",
    databaseURL: "https://tripplanner-9c647.firebaseio.com",
    storageBucket: "tripplanner-9c647.appspot.com",
    messagingSenderId: "87235016745"
}

export default firebase.initializeApp(config)