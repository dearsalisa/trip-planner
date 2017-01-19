import React from 'react'
import {
	Router,
	Route,
	IndexRoute,
	Redirect
} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Home from './containers/Home'
import App from './containers/App'
import Login from './containers/Login'


export default (store, history) => (
	<Router history={syncHistoryWithStore(history, store)}>
		<Route path='/' component={App}>
			<route path='home' component={Home} />
			<route path='login' component={Login} />
			<Redirect from='*' to='/' />
		</Route>
	</Router>
)