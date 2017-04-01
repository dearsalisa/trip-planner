import React, { Component } from 'react'
import '../css/App.css'
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

export default App;
