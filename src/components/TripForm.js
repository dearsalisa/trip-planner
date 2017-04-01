import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Field } from 'redux-form'
import { addTrip } from '../actions/tripAction'

const renderField = ({ input, label, type }) => (
	<div>
	<label>{label}</label>{' '}
	<input {...input} type={type} /> {' '}
	</div>
)

class TripForm extends Component {

	constructor(props){
		super(props)
		this.addTrip = this.addTrip.bind(this)
	}
	addTrip(e) {
		var out = e.target
		out.user = this.props.user
		this.props.onSubmitTrip(out)
		e.preventDefault();
	}

	render() {
		const { submitting, reset } = this.props;
		return (
			<form onSubmit={this.addTrip} className='form'>
				<Field name="trip_name" component={renderField} type="text" label='NAME'/>
				<Field name="trip_detail" component={renderField} type="text" label='DETAIL'/>
				<br /><br />
				<div>
					<Button type='submit' bsStyle="primary" disabled={submitting}>CREAT TRIP</Button>
					{' '}
					<Button type='reset' bsStyle="danger" disabled={submitting} onClick={reset}>CANCLE</Button>
				</div>
			</form>
		)
	}
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
	onSubmitTrip(value) {
		dispatch(addTrip(value))
	}
})

TripForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(TripForm)

export default TripForm
