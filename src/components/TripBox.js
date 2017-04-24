import React from 'react';
import '../css/Profile.css';
import { Media, Glyphicon  } from 'react-bootstrap'
import { Link } from 'react-router'

const TripBox = ({tripKey, trip, isEdit, removeAction}) => {
	return (
		<div className="bg_box">
			<Media>
			 <Media.Left>
					<img width={150} height={100} role="presentation" src={ trip.image !== undefined ? trip.image : require('../images/trip01.jpg')}/>
				</Media.Left>
				<Media.Body>
					<Media.Heading>
						<Link to={ isEdit ? `/${tripKey}/edit/timeline`: `/${tripKey}/view`}>{trip.name}</Link>
						{
							(removeAction !== undefined)? <Glyphicon className="remove_trip" glyph="trash" onClick={ () => removeAction()}/> : ""
						}
					</Media.Heading>
					<p className="text">{trip.detail}</p>
				</Media.Body>
			</Media>
		</div>
	)
}

export default TripBox
