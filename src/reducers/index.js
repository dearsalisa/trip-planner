import { combineReducers } from 'redux'
import { routerReducer  } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import currentUser from './currentUser'
import tripInfo from './tripInfo'
import allTrips from './allTrips'
import tripbyId from './tripbyId'

export default combineReducers({
	routing: routerReducer,
	form: formReducer,
	
	currentUser,
	tripInfo,
	allTrips,
	tripbyId
})