import firebase from 'firebase'
import { push } from 'react-router-redux'

export const getTrips = () => {
	return (dispatch) => {
		firebase.database().ref('Trips').once('value')
		.then((snap) => {
	      var ei = JSON.stringify(snap.val());
	      var eiei = JSON.parse(ei);
		  getTripSuccess(dispatch, eiei)
		})
	}
}

const startGetTrips = (dispatch) => {
	dispatch({ type: "GET_TRIP" })
}

const getTripSuccess = (dispatch, eiei) => {
	console.log("GET TRIP SUCCESS")
	dispatch({ type: "GET_TRIP_SUCCESS", payload: eiei })
}

const getTripFail = (dispatch) => {
	dispatch({ type: "GET_TRIP_FAIL" })
}