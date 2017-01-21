import React, { Component } from 'react';
import '../css/App.css';
import * as firebase from 'firebase';
// import firebaseApp from '../helpers/Firebase';

class App extends Component {

  state = {
  authed: false,
  loading: true,
}
componentWillMount () {
  this.removeListener = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({
        authed: true,
        loading: false,
      })
    } else {
      this.setState({
        loading: false
      })
    }
  })
}
componentWillUnmount () {
  this.removeListener()
}

    render() {
      return (
        <div className="App">
          <h1>{this.state.authed ? "YES" : "NO" }</h1>
          <div>{firebase.auth().currentUser == null ? "NULL" : firebase.auth().currentUser.email}</div>
          <div>{ this.props.children }</div>
        </div>
        )
    }
}

export default App;
