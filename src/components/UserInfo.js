import React, { Component } from 'react';
import '../css/Profile.css';
import * as firebase from 'firebase';

const UserInfo = (user) => {
	return (
		<div className="bg_userinfo">
			<img className="profile_pic" src={user.photoURL}/>
			<h3>{user.displayName}</h3>
			<h4>{user.email == null ? "" : user.email}</h4>
		</div>
	)
}

export default UserInfo
