import firebase from 'firebase'
import { push } from 'react-router-redux'

export const addTrip = ({ trip_name, trip_detail, user }) => {
	return (dispatch) => {
		var fb = firebase.database().ref('trips')
    console.log(`trip_name: ${trip_name.value}, trip_detail: ${trip_detail.value} owner: ${user.uid}`)
    var rawTrip = {
			name: trip_name.value,
			detail: trip_detail.value,
      owner: user.uid,
      createAt: firebase.database.ServerValue.TIMESTAMP
		}

		var newTrip = fb.push(rawTrip)
		.then((newTrip) => {
      rawTrip.key = newTrip.key
			addTripSuccess(dispatch,rawTrip)
      firebase.database().ref(`users/${user.uid}/trips`).push(newTrip.key)
		})
    .catch((error) => {
      console.log(error)
      addTripFail(dispatch)
    })
	}
}

const addTripSuccess = (dispatch, trip) => {
	console.log("ADD TRIP SUCCESS")
	dispatch({ type: "ADD_TRIP_SUCCESS", newTrip: trip })
}

const addTripFail = (dispatch) => {
	dispatch({ type: "ADD_TRIP_FAIL" })
}
