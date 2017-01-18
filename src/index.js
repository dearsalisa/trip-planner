import React from 'react'
import { render } from 'react-dom'
//import App from './components/App'
import './index.css'
import * as firebase from 'firebase'
import routes from './routes'

var config = {
    apiKey: "AIzaSyBClQ0-3LBYGgTE4Z5O_eWustSoikQ9HFQ",
    authDomain: "tripplanner-9c647.firebaseapp.com",
    databaseURL: "https://tripplanner-9c647.firebaseio.com",
    storageBucket: "tripplanner-9c647.appspot.com",
    messagingSenderId: "87235016745"
}

firebase.initializeApp(config)

//render(<App />,document.getElementById('root'))

render(routes(), document.getElementById('root'))