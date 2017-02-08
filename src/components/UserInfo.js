import React, { Component } from 'react';
import '../css/Profile.css';
import * as firebase from 'firebase';

const UserInfo = () => {
	return (
		<div className="bg_userinfo">
			<img className="profile_pic" src={require('../images/profile_pic.jpg')}/>
			<h3>dearsalisa</h3>
			<h4>dearsalisa@gmail.com</h4>
		</div>
	)
}

export default UserInfo