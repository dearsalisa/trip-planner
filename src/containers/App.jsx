import React, { Component } from 'react';
import '../css/App.css';
import * as firebase from 'firebase';

class App extends Component {

    // constructor() {
    //   super();
    //   this.state = {
    //     speed: 100
    //   };
    // }

    render() {
      return (
        <div className="App">
          <div>{ this.props.children }</div>
        </div>
        )
    }
}

export default App;
