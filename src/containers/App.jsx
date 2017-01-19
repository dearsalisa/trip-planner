import React, { Component } from 'react';
import '../css/App.css';
import * as firebase from 'firebase';
// import firebaseApp from '../helpers/Firebase';

class App extends Component {

    componentWillMount(){
        // TODO: firebaseApp onAuthStateChange
    }

    render() {
      return (
        <div className="App">
          <div>{ this.props.children }</div>
        </div>
        )
    }
}

export default App;
