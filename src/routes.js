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
import Profile from './containers/Profile'


export default (store, history) => (
	<Router history={syncHistoryWithStore(history, store)}>
		<Route path='/' component={App}>
			<route path='login' component={Login} />
			<route path='home' component={Home} />
			<route path='profile' component={Profile} />
			<Redirect from='*' to='/' />
		</Route>
	</Router>
)