import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Alltrip.css'
import { Row, Col, Thumbnail, Grid, Button, FormGroup, FormControl } from 'react-bootstrap'
import { Link } from 'react-router'
import Footer from '../components/Footer'
import TripRow from '../components/TripRow'

class AllTrip extends Component {

	constructor(props){
    super(props)
    this.state = {
			text: "",
			result: []
    };
    this.searchTrip = this.searchTrip.bind(this)
  }

	searchTrip() {
		var text = this.refs.text.value
		var item = this.props.trips
		this.setState({result: [] })
		if(item !== null) {
			var resultTrip = Object.keys(item).map(function(key, index) {
				item[key].key = key
				return item[key]
			}).filter( (trip) => {
				return trip.name.includes(text)
			} )
			this.setState({text: text, result: resultTrip })
		}
	}

	render() {

		return (
			<center className="bg">
				<div>
          <div className="search_form">
            <h1><b>SEARCH TRIP</b></h1>
            <input className="search_box" ref="text" type="text" placeholder="Enter text" onChange={(e)=> {
								this.searchTrip()
							}} onKeyPress={(e) => {
								 if (e.key === 'Enter') {
									 this.searchTrip()
								 }
							}}/><br/>
            <Button className="search_btn" onClick={this.searchTrip}>SEARCH</Button>
          </div>
					<h1 className="topic"><b> ALL TRIPS </b></h1>
					<Grid>
     				<Row>
							{
								this.state.text == "" ?
								<TripRow trips={this.props.trips} allUsers={this.props.allUsers} /> :
								<TripRow trips={this.state.result} allUsers={this.props.allUsers} />
							}
						</Row>
					</Grid>
          <Footer />
				</div>
			</center>
		)
	}
}

const mapStateToProps = (state) => ({
  trips: state.trips.allTrips,
	allUsers: state.auth.allUsers
})

const mapDispatchToProps = (dispatch) => ({

})

AllTrip = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllTrip)

export default AllTrip
