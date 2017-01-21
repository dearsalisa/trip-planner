import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { loginUser } from '../actions/AuthAction'
import  LoginForm  from '../components/LoginForm'

class Login extends Component {

    state = {}

	render(){
		const { handleSubmit, reset, submitting } = this.props

		return (
			<div>
				<div className="page-header">
				  <h1>Add User</h1>
				</div>
				<LoginForm {...this.props} />
			</div>
		)
	}
}

Login = reduxForm({
	form: 'adduser'
})(Login)

const mapStateToProps = (state) => ({UserReducer: state.UserReducer.get.data})

const mapDispatchToProps = (dispatch) => ({
  onSubmit(values) {
    dispatch(loginUser(values))
  }
})

Login = connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)

export default Login
