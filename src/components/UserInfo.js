import React from 'react';
import '../css/Profile.css';
import { Image, Button, Glyphicon } from 'react-bootstrap'

const UserInfo = (user) => {
	return (
		<div className="bg_userinfo">
			<Image src={user.photoURL} thumbnail />
			<h3>{user.displayName}</h3>
			<h5>{user.email == null ? "" : user.email}</h5>
			<Button className="profile_btn" bsSize="large" >
				<Glyphicon className="calendar" glyph="calendar" /> 3  TRIPS
			</Button>
			<Button className="profile_btn" bsSize="large" >
				<Glyphicon className="heart" glyph="heart" /> LIKE
			</Button>
		</div>
	)
}

export default UserInfo
