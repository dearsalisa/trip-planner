import React from 'react';
import '../css/Tripview.css';
import { Button, Glyphicon } from 'react-bootstrap'

const TripInfoView = ({tripInfo}) => {
	return (
		<div className="trip_header">
			<center className="trip_detail">
				<h2>{tripInfo.name}</h2>
				<h4>{tripInfo.detail}</h4>
				<Button className="view_btn" bsSize="large" >
					<Glyphicon className="heart-empty" glyph="heart-empty" /> LIKE
				</Button>
				<Button className="view_btn" bsSize="large" >
					<Glyphicon className="duplicate" glyph="duplicate" /> DUPLICATE
				</Button>
				<Button className="view_btn" bsSize="large" >
					<Glyphicon className="share" glyph="share-alt" /> SHARE
				</Button>
			</center>
		</div>
	)
}

export default TripInfoView
