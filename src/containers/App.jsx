import React, { Component } from 'react'
import '../css/App.css'
import Header from '../components/Header'
import { connect } from 'react-redux'
import { listenAllTrips } from '../actions/tripAction'
import { getAllUser } from '../actions/authAction'

class App extends Component {

	componentWillMount(){
		this.props.listenAllTrips()
		this.props.loadAllUser()
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
})

const mapDispatchToProps = (dispatch) => ({
	listenAllTrips() {
		dispatch(listenAllTrips())
	},
	loadAllUser() {
		dispatch(getAllUser())
	}
})

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default App;
