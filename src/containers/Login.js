import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fbSignIn } from '../actions/authAction'
import '../css/Login.css'

class Login extends Component {

	render(){
		const { onSignInClick } = this.props;
		return (
			<div className="login_bg">
				<button className="login_button" onClick={ onSignInClick }></button>
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
