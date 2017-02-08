import React, { Component } from 'react';
import '../css/Profile.css';
import * as firebase from 'firebase';
import { Col, Row, Grid } from 'react-bootstrap'

const TripBox = () => {
	return (
		<div className="bg_box">
			<Row>
				<Col xs={4} md={4}>
					<img className="trip_pic" src={require('../images/trip01.jpg')}/>
				</Col>
				<Col xs={8} md={8}>
					<h2 className="trip_name"><b>Diving between tectonic plates</b></h2>
					<h4 className="trip_info">There is, however, one fantastic option: Silfra, Iceland. Thanks to the frigid Arctic temperatures, you’ll enjoy unsurpassed visibility beyond 100 meters while floating through an underwater canyon that divides the North American and Eurasian plates. Obviously, this is not for skin divers.</h4>
				</Col>
			</Row>
		</div>
	)
}

export default TripBox