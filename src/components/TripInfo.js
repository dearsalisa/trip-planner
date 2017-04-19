import React from 'react';
import '../css/Timeline.css';

const TripInfo = ({tripInfo}) => {
	return (
		<div className="tl_header">
			<div className="tl_info">
				<h1 className="tl_name">{tripInfo.name}</h1>
				<h4 className="tl_detail">{tripInfo.detail}</h4>
			</div>
		</div>
	)
}

export default TripInfo
