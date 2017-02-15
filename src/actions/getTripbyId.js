import firebase from 'firebase'
import { push } from 'react-router-redux'

export const getTripbyId = (tripKey) => {
	return (dispatch) => {
		firebase.database().ref('Trips/'+tripKey).once('value')
		.then((snap) => {
	      var ei = JSON.stringify(snap.val());
	      var eiei = JSON.parse(ei);
	      console.log(snap.val())
		  getTripbyIdSuccess(dispatch, eiei)
		})
	}
}

const startGetTripbyId = (dispatch) => {
	dispatch({ type: "GET_TRIP_BY_ID" })
}

const getTripbyIdSuccess = (dispatch, eiei) => {
	console.log("GET TRIP SUCCESS")
	dispatch({ type: "GET_TRIP_BY_ID_SUCCESS", payload: eiei })
}

const getTripbyIdFail = (dispatch) => {
	dispatch({ type: "GET_TRIP_BY_ID_FAIL" })
}