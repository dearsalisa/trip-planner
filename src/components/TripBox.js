import React from 'react';
import '../css/Profile.css';
import { Col, Row, Media  } from 'react-bootstrap'
import { Link } from 'react-router'

const TripBox = ({tripKey, trip, isEdit}) => {
	return (
		<div className="bg_box">
			<Media>
			 <Media.Left>
					<img width={150} height={100} src={require('../images/trip01.jpg')} alt="Image"/>
				</Media.Left>
				<Media.Body>
					<Media.Heading>
						<Link to={ isEdit ? `/${tripKey}/edit/timeline`: `/${tripKey}/view`}>{trip.name}</Link>
					</Media.Heading>
					<p className="text">{trip.detail}</p>
				</Media.Body>
			</Media>

		</div>
	)
}

export default TripBox
