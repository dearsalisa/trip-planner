import React from 'react'
import { Button } from 'react-bootstrap'
import { Field } from 'redux-form'

const renderField = ({ input, label, type }) => (
  <div>
    <label>{label}</label>{' '}
	<input {...input} type={type} /> {' '}
  </div>
)

const LoginForm = ({ handleSubmit, submitting, reset }) => {
	return (
	    <form onSubmit={handleSubmit} className='form' action='javascript:void(0)'>
			<Field name="email" component={renderField} type="text" label='E-mail :'/>
			<Field name="password" component={renderField} type="password" label='Password :'/>
			<div>
		    	<Button type='submit' bsStyle="primary" disabled={submitting}>Submit</Button>
		    	{' '}
		    	<Button type='reset' bsStyle="danger" disabled={submitting} onClick={reset}>Reset</Button>
		    </div>
	    </form>
	)
}

export default LoginForm