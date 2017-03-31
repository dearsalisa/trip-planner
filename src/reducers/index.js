import { combineReducers } from 'redux'
import { routerReducer  } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import currentUser from './currentUser'
import allTrips from './allTrips'
import tripbyId from './tripbyId'
import timeline from './timeline'
import authReducer from './auth'
import tripReducer from './trips'

export default combineReducers({
	routing: routerReducer,
	form: formReducer,
	auth: authReducer,
	trips: tripReducer,
	currentUser,
	allTrips,
	tripbyId,
	timeline
})
