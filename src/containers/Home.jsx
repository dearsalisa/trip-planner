import React, { Component } from 'react'
import '../css/Home.css'
import * as firebase from 'firebase'
import SlideShow from '../components/SlideShow'
import { Button, Row, Col } from 'react-bootstrap'

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
  		<center className="bg">
        <div className="page">
        <div className="home_content">
        <SlideShow />
        <h1 className="topic">Reccommend</h1>
        <hr />

        <Row className="show-grid">
          <Col xs={6} md={4}>
            <img className="home_pic" src={require('../images/home01.jpg')}/>
            <h3>TRIP NAME</h3>
            <h4>description</h4>
          </Col>
          <Col xs={6} md={4}>
            <img className="home_pic" src={require('../images/home02.jpg')}/>
            <h3>TRIP NAME</h3>
            <h4>description</h4>
          </Col>
          <Col xsHidden md={4}>
            <img className="home_pic" src={require('../images/home03.jpg')}/>
            <h3>TRIP NAME</h3>
            <h4>description</h4>
          </Col>
        </Row>

        <h1 className="topic">Popular Trip</h1>
        <hr />

        <Row className="show-grid">
          <Col xs={6} md={4}>
            <img className="home_pic" src={require('../images/home04.jpg')}/>
            <h3>TRIP NAME</h3>
            <h4>description</h4>
          </Col>
          <Col xs={6} md={4}>
            <img className="home_pic" src={require('../images/home05.jpg')}/>
            <h3>TRIP NAME</h3>
            <h4>description</h4>
          </Col>
          <Col xsHidden md={4}>
            <img className="home_pic" src={require('../images/home06.jpg')}/>
            <h3>TRIP NAME</h3>
            <h4>description</h4>
          </Col>
        </Row>

        <br/><br/><br/><br/>
				<h1>{this.state.speed}</h1>
        <button onClick={writeUserData(1,"Salisa","eiei@hotmail.com")}>OK</button>
        </div>
        </div>
			</center>
  	)
  }
}

export default Home
