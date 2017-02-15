import React, { Component } from 'react';
import '../css/Timeline.css';
import * as firebase from 'firebase';

const TripInfo = ({tripInfo}) => {
	//console.log(data)
	return (
		<div className="trip_header">
			<center>
				<h2>{tripInfo[1]}</h2>
				<h4>{tripInfo[2]}</h4>
			</center>
		</div>
	)
}

export default TripInfo