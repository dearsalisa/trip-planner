import React from 'react'
import {
	Router,
	Route,
	Redirect
} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Home from './containers/Home'
import App from './containers/App'
import Login from './containers/Login'
import Profile from './containers/Profile'
import Timeline from './containers/Timeline'
import Tripview from './containers/Tripview'
import { isLogin } from './actions/authAction'

export default (store, history) => (
	<Router history={syncHistoryWithStore(history, store)}>
		<route path='/login' component={Login} />
			<Route path='/' component={App}  onEnter={ (nextState, replace, callback) => {
						store.dispatch(isLogin()).then( (data) => {
							callback()
						}).catch( () => {
							replace("/login")
							callback()
						})
					}
				}>
				<route path='home' component={Home} />
				<route path='profile' component={Profile} />
				<route path=':tripKey/edit/timeline' component={Timeline} />
				<route path=':tripKey/view' component={Tripview} />
				<Redirect from='*' to='/' />
		</Route>
	</Router>
)
