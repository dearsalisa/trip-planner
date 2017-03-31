import firebase from 'firebase'
import { push } from 'react-router-redux'

var today = new Date().toISOString();
export const addTrip = ({ trip_name, trip_detail, start=today, end=today }) => {
	//console.log(trip_name, trip_detail, start, end);
	return (dispatch) => {
		var fb = firebase.database().ref('Trips')
		var newTrip = fb.push({
			name: trip_name,
			detail: trip_detail
		})
		.then((newTrip) => {
			var trip = [newTrip.key, trip_name, trip_detail, start, end]
			//console.log(newTrip.key)
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
