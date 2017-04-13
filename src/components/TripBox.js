import React from 'react';
import '../css/Profile.css';
import { Col, Row  } from 'react-bootstrap'
import { Link } from 'react-router'

const TripBox = ({tripKey, trip}) => {
	return (
		<div className="bg_box">
			<Row>
				<Col xs={4} md={4}>
					<img className="trip_pic" role="presentation" src={require('../images/trip01.jpg')}/>
				</Col>
				<Col xs={8} md={8}>
					<Link to={`/${tripKey}/edit/timeline`}>
						<h4 className="trip_name"><b>{trip.name}</b></h4>
					</Link>
					<h5 className="trip_info">{trip.detail}</h5>
				</Col>
			</Row>
		</div>
	)
}

export default TripBox
