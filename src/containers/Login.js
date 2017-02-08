import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { doAuth } from '../actions/doAuth'
import  LoginForm  from '../components/LoginForm'
import '../css/Home.css'

//const { doAuth } = actions

class Login extends Component {

	state = {}

	//componentDidMount() {
	// // // 	this.prop.doAuth()
	// 	console.log(this.props.currentUser)
	// }

	render(){
		return (
			<div>
				<center>
				<img className="login_pic" src={require('../images/login.jpg')}/>
				<h2>SIGN IN</h2>
				<LoginForm {...this.props} />
				<h1>{this.props.currentUser.email}</h1>
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
	onSubmit(values) {
		dispatch(doAuth(values))
	}
})

Login = connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)

export default Login
