import React, { Component } from 'react'
import '../css/Home.css'
import * as firebase from 'firebase'
import SlideShow from '../components/SlideShow'
import { Button } from 'react-bootstrap'

class Home extends Component {

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
  		<div>
        <SlideShow />
        <h1 className="topic">Reccommend</h1>
        <hr />

        <h1 className="topic">Popular Trip</h1>
        <hr />

         <Button>Default</Button>

        <br/><br/><br/><br/>
				<h1>{this.state.speed}</h1>
        <button onClick={writeUserData(1,"Salisa","eiei@hotmail.com")}>OK</button>
			</div>
  	)
  }
}

export default Home
