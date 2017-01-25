import React from 'react'
import { Button } from 'react-bootstrap'
import { Field } from 'redux-form'
import DateTest from '../components/DateTest'

const renderField = ({ input, label, type }) => (
  <div>
    <label>{label}</label>{' '}
	<input {...input} type={type} /> {' '}
  </div>
)

const TripForm = ({ handleSubmit, submitting, reset }) => {

	return (
	    <form onSubmit={handleSubmit} className='form' action='javascript:void(0)'>
			<Field name="trip_name" component={renderField} type="text" label='NAME'/>
			<Field name="trip_detail" component={renderField} type="text" label='DETAIL'/>
			<br /><br /> 
			<DateTest />
			<div>
		    	<Button type='submit' bsStyle="primary" disabled={submitting}>CREAT TRIP</Button>
		    	{' '}
		    	<Button type='reset' bsStyle="danger" disabled={submitting} onClick={reset}>CANCLE</Button>
		    </div>
	    </form>
	)
}

export default TripForm

// onChange={this.handleChange} value={this.state.date}"