import React, { Component } from 'react'
import '../css/Home.css'
import SlideShow from '../components/SlideShow'
import { Row, Col } from 'react-bootstrap'

class Home extends Component {

	render() {
		return (
			<center className="bg">
				<div className="page">
				<div className="home_content">
				<SlideShow />
				<br/><br/>
				<h1 className="topic">Reccommend</h1>
				<hr />

				<Row className="show-grid">
					<Col xs={6} md={3}>
						<img className="home_pic" role="presentation" src={require('../images/home01.jpg')}/>
						<h3>TRIP NAME</h3>
						<h4>description</h4>
					</Col>
					<Col xs={6} md={3}>
						<img className="home_pic" role="presentation" src={require('../images/home02.jpg')}/>
						<h3>TRIP NAME</h3>
						<h4>description</h4>
					</Col>
					<Col xs={6} md={3}>
						<img className="home_pic" role="presentation" src={require('../images/home03.jpg')}/>
						<h3>TRIP NAME</h3>
						<h4>description</h4>
					</Col>
					<Col xs={6} md={3}>
						<img className="home_pic" role="presentation" src={require('../images/home03.jpg')}/>
						<h3>TRIP NAME</h3>
						<h4>description</h4>
					</Col>
				</Row>

				<h1 className="topic">Popular Trip</h1>
				<hr />

				<Row className="show-grid">
					<Col xs={6} md={3}>
						<img className="home_pic" role="presentation" src={require('../images/home04.jpg')}/>
						<h3>TRIP NAME</h3>
						<h4>description</h4>
					</Col>
					<Col xs={6} md={3}>
						<img className="home_pic" role="presentation" src={require('../images/home05.jpg')}/>
						<h3>TRIP NAME</h3>
						<h4>description</h4>
					</Col>
					<Col xs={6} md={3}>
						<img className="home_pic" role="presentation" src={require('../images/home06.jpg')}/>
						<h3>TRIP NAME</h3>
						<h4>description</h4>
					</Col>
					<Col xs={6} md={3}>
						<img className="home_pic" role="presentation" src={require('../images/home03.jpg')}/>
						<h3>TRIP NAME</h3>
						<h4>description</h4>
					</Col>
				</Row>

				</div>
				</div>
			</center>
		)
	}
}

export default Home
