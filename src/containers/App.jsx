import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/App.css'
import * as firebase from 'firebase'
import Header from '../components/Header'

class App extends Component {

	render() {
		return (
			<div className="App">
				<Header />
				<div>{ this.props.children }</div>
			</div>
			)
	}
}

// const mapStateToProps = (state) => ({
//   user: state.auth.user
// })

// const mapDispatchToProps = (dispatch) => ({
// })

// App = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App)

export default App;
