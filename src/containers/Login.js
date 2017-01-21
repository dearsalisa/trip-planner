import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { doAuth } from '../actions/doAuth'
import  LoginForm  from '../components/LoginForm'

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
				<div className="page-header">
				  <h1>Add User</h1>
				</div>
				<LoginForm {...this.props} />
				<h1>{this.props.currentUser.email}</h1>
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
