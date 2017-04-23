import React, { Component } from 'react'
import '../css/App.css'
import Header from '../components/Header'
import { connect } from 'react-redux'
import { listenAllTrips, listenMyTrips } from '../actions/tripAction'
import { getAllUser } from '../actions/authAction'
import { getArticle } from '../actions/articleAction'

class App extends Component {

	componentWillMount(){
		this.props.listenAllTrips()
		this.props.loadAllUser()
		this.props.listenMyTrips(this.props.user.uid)
		this.props.getArticle()
	}

	render() {
		return (
			<div className="App">
				<Header />
				<div>{ this.props.children }</div>
			</div>
			)
	}
}

const mapStateToProps = (state) => ({
  isListenAllTrips: state.trips.isListenAllTrips,
	user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
	listenAllTrips() {
		dispatch(listenAllTrips())
	},
	loadAllUser() {
		dispatch(getAllUser())
	},
	listenMyTrips(user_id) {
		dispatch(listenMyTrips({user_id: user_id}))
	},
	getArticle() {
		dispatch(getArticle())
	}
})

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default App;
