import firebase from 'firebase'
import { push } from 'react-router-redux'

export const addTrip = ({ trip_name, trip_detail, date }) => {
	console.log(trip_name, trip_detail, date);
	return (dispatch) => {
		firebase.database().ref('Trips').push({
			name: trip_name,
			detail: trip_detail
		})
		.then((trip) => {
			addTripSuccess(dispatch, trip)
			dispatch(push(`/timeline`))
		})
	}
}

const startAddTrip = (dispatch) => {
	dispatch({ type: "ADD_TRIP" })
}

const addTripSuccess = (dispatch, trip) => {
	console.log("ADD TRIP SUCCESS")
	dispatch({ type: "ADD_TRIP_SUCCESS", payload: trip })
}

const addTripFail = (dispatch) => {
	dispatch({ type: "ADD_TRIP_FAIL" })
}
