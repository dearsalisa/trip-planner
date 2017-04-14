import React from 'react';
import '../css/Profile.css';
import { Image } from 'react-bootstrap'

const UserInfo = (user) => {
	return (
		<div className="bg_userinfo">
			<Image src={user.photoURL} thumbnail />
			<h3>{user.displayName}</h3>
			<h5>{user.email == null ? "" : user.email}</h5>
		</div>
	)
}

export default UserInfo
