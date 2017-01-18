import React from 'react'
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router'
import Home from './containers/Home'
import App from './containers/App'

export default () => {
	return (
		<Router history={browserHistory}>
			<Route path='/' component={App}>
				<route path='home' component={Home} />
				<Redirect from='*' to='/' />
			</Route>
		</Router>
	)
}