import firebase from 'firebase'

const addTripSuccess = (dispatch, trip) => {
	console.log("ADD TRIP SUCCESS")
	dispatch({ type: "ADD_TRIP_SUCCESS", newTrip: trip })
}

const addTripFail = (dispatch) => {
	dispatch({ type: "ADD_TRIP_FAIL" })
}

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
