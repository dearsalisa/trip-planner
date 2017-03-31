import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { fbSignIn } from '../actions/authAction'
import  LoginForm  from '../components/LoginForm'
import '../css/Home.css'

class Login extends Component {

	render(){
		const { onSignInClick} = this.props;
		return (
			<div>
				<center>
				<img className="login_pic" src={require('../images/login.jpg')}/>
				<h2>SIGN IN</h2>
				<button onClick={ onSignInClick }>Facebook Login</button>
				</center>
			</div>
		)
	}
}

Login = reduxForm({
	form: 'adduser'
})(Login)

const mapStateToProps = (state) => ({
	currentUser: state.currentUser.get.data
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
