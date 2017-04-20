import { combineReducers } from 'redux'
import { routerReducer  } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import authReducer from './auth'
import tripReducer from './trips'
import articleReducer from './article'

export default combineReducers({
	routing: routerReducer,
	form: formReducer,
	auth: authReducer,
	trips: tripReducer,
	article: articleReducer
})
