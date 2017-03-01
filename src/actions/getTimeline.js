import firebase from 'firebase'
import { push } from 'react-router-redux'

export const getTimeline = (mykey) => {
	//console.log("key = "+mykey)
	return (dispatch) => {
		firebase.database().ref('Trips/'+mykey+'/Timeline').once('value')
		.then((snap) => {
	      var ei = JSON.stringify(snap.val());
	      var eiei = JSON.parse(ei);
	      //console.log("data ="+snap.val())
		  getTimelineSuccess(dispatch, eiei)
		})
	}
}

const startGetTimeline = (dispatch) => {
	dispatch({ type: "GET_TIMELINE" })
}

const getTimelineSuccess = (dispatch, eiei) => {
	console.log("GET TIMELINE SUCCESS")
	dispatch({ type: "GET_TIMELINE_SUCCESS", payload: eiei })
}

const getTimelineFail = (dispatch) => {
	dispatch({ type: "GET_TIMELINE_FAIL" })
}