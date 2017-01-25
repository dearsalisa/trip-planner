import firebase from 'firebase'
import { push } from 'react-router-redux'

export const addTrip = ({ trip_name, trip_detail, date }) => {
	console.log(trip_name, trip_detail, date);
	return (dispatch) => {
		firebase.database().ref('test').set({
        name: trip_name,
        detail: trip_detail
      })
		.then(() => {
				dispatch(push(`/timeline`))
			})
	}
}

const startAddTrip = (dispatch) => {
	dispatch({ type: "ADD_TRIP" })
}

const addTripSuccess = (dispatch, user) => {
	console.log("LOGIN SUCCESS")
	dispatch({ type: "ADD_TRIP_SUCCESS", payload: user })
}

const addTripFail = (dispatch) => {
	dispatch({ type: "ADD_TRIP_FAIL" })
}
