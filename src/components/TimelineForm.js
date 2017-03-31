import React from 'react'
import { Button } from 'react-bootstrap'
import { Field } from 'redux-form'
import DatePicker from 'react-bootstrap-date-picker';

const renderField = ({ input, label, type }) => (
	<div>
	<label>{label}</label>
	<input {...input} type={type} />
	</div>
)

const TimelineForm = ({ handleSubmit, submitting, reset }) => {
	return (
		<form onSubmit={handleSubmit} className='form' action='javascript:void(0)'>
			<Field name="time" component={renderField} type="text" label='TIME'/>
			<Field name="name" component={renderField} type="text" label='NAME'/>
			<div>
				<Button type='submit' bsStyle="primary" disabled={submitting}>ADD</Button>
			</div>
		</form>
	)
}

export default TimelineForm