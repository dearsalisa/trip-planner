import React from 'react';
import '../css/Timeline.css';

const TripInfo = ({tripInfo}) => {
	return (
		<div className="trip_header">
			<center>
				<h2>{tripInfo.name}</h2>
				<h4>{tripInfo.detail}</h4>
			</center>
		</div>
	)
}

export default TripInfo
