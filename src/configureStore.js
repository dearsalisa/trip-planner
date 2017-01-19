import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './reducers'

export default (history) => {
	const middlewares = [thunk, routerMiddleware(history)]
	const store = createStore(
		rootReducer,
		applyMiddleware(...middlewares)
	)
	return store
}