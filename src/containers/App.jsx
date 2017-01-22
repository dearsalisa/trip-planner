import React, { Component } from 'react'
import '../css/App.css'
import * as firebase from 'firebase'
import Header from '../components/Header'

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
          <Header />
          <div>{ this.props.children }</div>
        </div>
        )
    }
}

export default App;
