import React from 'react'
import { Button } from 'react-bootstrap'
import { Field } from 'redux-form'
import DatePicker from 'react-bootstrap-date-picker';

const renderField = ({ input, label, type }) => (
	<div>
	<label>{label}</label>{' '}
	<input {...input} type={type} /> {' '}
	</div>
)

var today = new Date().toISOString()
const datePicker = ({ input, label, type, defaultValue }) => (
	<div>
		<DatePicker {...input} value={ input.value? input.value : today} />
	</div>
)

const TripForm = ({ handleSubmit, submitting, reset }) => {
	return (
		<form onSubmit={handleSubmit} className='form' action='javascript:void(0)'>
			<Field name="trip_name" component={renderField} type="text" label='NAME'/>
			<Field name="trip_detail" component={renderField} type="text" label='DETAIL'/>
			<br /><br /> 
			<Field name="start" component={datePicker} type="date" label='START'/>
			<Field name="end" component={datePicker} type="date" label='END'/>
			<div>
				<Button type='submit' bsStyle="primary" disabled={submitting}>CREAT TRIP</Button>
				{' '}
				<Button type='reset' bsStyle="danger" disabled={submitting} onClick={reset}>CANCLE</Button>
			</div>
		</form>
	)
}

export default TripForm

//<Field name="date" component={DateTest} type="text" label='DATE'/>

//placeholder="STARE DATE" value={this.state.date} id="start-datepicker" onChange={this.handleChange}