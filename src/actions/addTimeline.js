import firebase from 'firebase'
import { push } from 'react-router-redux'

export const addTimeline = ({ name, time, tripkey }) => {
	//console.log(name, time, tripkey);
	return (dispatch) => {
		var fb = firebase.database().ref('Trips/'+tripkey+'/Timeline')
		var newTrip = fb.push({
			time: time,
			name: name
		})
		.then((newTrip) => {
			var trip = [newTrip.key, time, name]
			addTimelineSuccess(dispatch, trip)
		})
	}
}

const startAddTimeline = (dispatch) => {
	dispatch({ type: "ADD_TIMELINE" })
}

const addTimelineSuccess = (dispatch, trip) => {
	console.log("ADD TIMELINE SUCCESS")
	dispatch({ type: "ADD_TIMELINE_SUCCESS", payload: trip })
}

const addTimelineFail = (dispatch) => {
	dispatch({ type: "ADD_TIMELINE_FAIL" })
}
