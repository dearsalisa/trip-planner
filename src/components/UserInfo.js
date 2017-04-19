import React from 'react';
import '../css/Profile.css';
import { Image } from 'react-bootstrap'

const UserInfo = (user) => {
	return (
		<div className="bg_userinfo">
			<Image src={user.photoURL} thumbnail />
			<h2>{user.displayName}</h2>
			<h4 className="email_text">{user.email == null ? "" : user.email}</h4>
		</div>
	)
}

export default UserInfo
