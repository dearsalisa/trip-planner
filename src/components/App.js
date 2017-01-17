import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/App.css';
import * as firebase from 'firebase';

class App extends Component {

    constructor() {
      super();
      this.state = {
        speed: 100
      };
    }

    componentDidMount() {
      const rootRef = firebase.database().ref().child('react');
      const speedRef = rootRef.child('speed');
      speedRef.on('value', snap => {
        this.setState({
          speed: snap.val()
        });
      });
    }



    render() {

      var database = firebase.database();

      function writeUserData(userId, name, email) {
        firebase.database().ref('users/' + userId).set({
          username: name,
          email: email
        });
      }

      return (
        <div className="App">
          <h1>{this.state.speed}</h1>
          <button onclick={writeUserData(1,"Salisa","eiei@hotmail.com")}>OK</button>
        </div>
        );
    }
}

export default App;
