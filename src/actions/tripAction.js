import firebase from 'firebase'
import { push } from 'react-router-redux'

const addTripSuccess = (dispatch, trip) => {
	console.log("ADD TRIP SUCCESS")
	dispatch({ type: "ADD_TRIP_SUCCESS", newTrip: trip })
}

const addTripFail = (dispatch) => {
	dispatch({ type: "ADD_TRIP_FAIL" })
}

export const addTrip = ({name, detail, user}) => {
	return (dispatch) => {
		var fb = firebase.database().ref('trips')
    var rawTrip = {
			name: name,
			detail: detail,
      owner: user,
      createAt: firebase.database.ServerValue.TIMESTAMP
		}

		var newTrip = fb.push(rawTrip)
		.then((newTrip) => {
      rawTrip.key = newTrip.key
			addTripSuccess(dispatch,rawTrip)
      firebase.database().ref(`users/${user}/trips`).push(newTrip.key)
			dispatch(push(`${newTrip.key}/edit/timeline`))
		})
    .catch((error) => {
      console.log(error)
      addTripFail(dispatch)
    })
	}
}

export const updateTrip = ({ trip, trip_id }) => {
	return (dispatch) => {
		console.log(trip)
		console.log(trip_id)
		var fb = firebase.database().ref(`trips/${trip_id}`)
		fb.set(trip).then( (newTrip) => {
			dispatch({ type: "UPDATE_TRIP_SUCCESS", trip: trip, key: trip_id })
		})
	}
}

export const listenAllTrips = () => {
	return (dispatch) => {
		dispatch({ type: "LISTEN_ALL_TRIPS"})
		firebase.database().ref('trips').on('value',function(dataSnapshot){
			console.log("TRIPS_CHANGE")
			dispatch({ type: "TRIPS_CHANGE", trips: dataSnapshot.val()})
		})
	}
}

export const listenMyTrips = ({user_id}) => {
	return (dispatch) => {
		dispatch({ type: "LISTEN_MY_TRIPS"})
		firebase.database().ref(`users/${user_id}/trips`).on('value',function(dataSnapshot){
			console.log("MY_TRIPS_CHANGE")
			dispatch({ type: "MY_TRIPS_CHANGE", trips: dataSnapshot.val()})
		})
	}
}

export const likeTrip = ({trip_id, user_id}) => {
	return (dispatch) => {
		firebase.database().ref(`trips/${trip_id}/like`).push(user_id)
		firebase.database().ref(`users/${user_id}/like`).push(trip_id)
	}
}

export const unLikeTrip = ({trip_id, user_id}) => {
	return (dispatch) => {
		firebase.database().ref(`trips/${trip_id}/like`).once('value').then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				if(childSnapshot.val() === user_id) {
					firebase.database().ref(`trips/${trip_id}/like`).child(childSnapshot.key).remove()
				}
			})
		})

		firebase.database().ref(`users/${user_id}/like`).once('value').then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				if(childSnapshot.val() === trip_id) {
					firebase.database().ref(`users/${user_id}/like`).child(childSnapshot.key).remove()
				}
			})
		})
	}
}

export const duplicateTrip = ({ trip, user_id }) => {
	return (dispatch) => {
		dispatch({ type: "DUPLICATING_TRIPS"})
		console.log(trip)
		var fb = firebase.database().ref('trips')
		var rawTrip = {
			name: trip.name,
			detail: trip.detail,
      owner: user_id,
			timeline: trip.timeline === undefined ? [] : trip.timeline,
			dup_id: trip.id,
      createAt: firebase.database.ServerValue.TIMESTAMP
		}

		var newTrip = fb.push(rawTrip)
		.then((newTrip) => {
      rawTrip.key = newTrip.key
      firebase.database().ref(`users/${user_id}/trips`).push(newTrip.key)
			dispatch({ type: "DUPLICATE_TRIPS_SUCCESS", newTrip: newTrip})
		})
    .catch((error) => {
      console.log(error)
			dispatch({ type: "DUPLICATE_TRIPS_FAIL"})
    })
	}
}

export const removeTrip = ({ trip_id, user_id }) => {
	return (dispatch) => {
			firebase.database().ref(`trips/${trip_id}`).remove()

			firebase.database().ref(`users/${user_id}/trips`).once('value').then(function(snapshot) {
				snapshot.forEach(function(childSnapshot) {
					if(childSnapshot.val() === trip_id) {
						firebase.database().ref(`users/${user_id}/trips`).child(childSnapshot.key).remove()
					}
				})
			})
			dispatch({ type: "REMOVE_TRIPS_SUCCESS", trip_id: trip_id })
	}
}
