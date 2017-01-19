import { combineReducers } from 'redux'
import { routerReducer  } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import UserReducer from './UserReducer' 

export default combineReducers({
	routing: routerReducer,
	form: formReducer,
	UserReducer
})