import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fbSignIn } from '../actions/authAction'
import '../css/Home.css'

class Login extends Component {

	render(){
		const { onSignInClick } = this.props;
		return (
			<div>
				<center>
				<img className="login_pic" role="presentation" src={require('../images/login.jpg')}/>
				<h2>SIGN IN</h2>
				<button onClick={ onSignInClick }>Facebook Login</button>
				</center>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
	onSignInClick(values) {
		dispatch(fbSignIn())
	}
})

Login = connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)

export default Login
