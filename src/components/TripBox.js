import React, { Component } from 'react';
import '../css/Profile.css';
import * as firebase from 'firebase';
import { Col, Row, Grid } from 'react-bootstrap'

const TripBox = ({name, detail}) => {
	return (
		<div className="bg_box">
			<Row>
				<Col xs={4} md={4}>
					<img className="trip_pic" src={require('../images/trip01.jpg')}/>
				</Col>
				<Col xs={8} md={8}>
					<h2 className="trip_name"><b>{name}</b></h2>
					<h4 className="trip_info">{detail}</h4>
				</Col>
			</Row>
		</div>
	)
}

export default TripBox