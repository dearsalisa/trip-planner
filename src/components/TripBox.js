import React from 'react';
import '../css/Profile.css';
import { Media  } from 'react-bootstrap'
import { Link } from 'react-router'

const TripBox = ({tripKey, trip, isEdit}) => {
	return (
		<div className="bg_box">
			<Media>
			 <Media.Left>
					<img width={150} height={100} role="presentation" src={require('../images/trip01.jpg')}/>
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
