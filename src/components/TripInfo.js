import React from 'react';
import '../css/Timeline.css';

const TripInfo = ({tripInfo}) => {
	return (
		<div className="tl_header">
			<div className="tl_detail">
				<h2>{tripInfo.name}</h2><br/>
				<h4>{tripInfo.detail}</h4>
			</div>
		</div>
	)
}

export default TripInfo
