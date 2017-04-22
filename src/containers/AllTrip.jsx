import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Alltrip.css'
import { Row, Col, Thumbnail, Grid, Button, FormGroup, FormControl } from 'react-bootstrap'
import { Link } from 'react-router'
import Footer from '../components/Footer'

class AllTrip extends Component {

	render() {
		var item = this.props.trips
		var users = this.props.allUsers
		if(item !== null) {
			var triprow = Object.keys(item).map(function(key, index) {
				var eiei = item[key].owner
				if(item[key] !== undefined && users[eiei] !== undefined){
					return(
						<div key={key}>
							<Col xs={4} md={3}>
								<Thumbnail className="box" src={require('../images/home03.jpg')} alt="242x200">
									<Link className="link_trip" to={`/${key}/view`}>
										<h4><b>{item[key].name}</b></h4>
									</Link>
									<p className="username">{users[eiei].displayName}</p>
									<p className="text">{item[key].detail}</p>
								</Thumbnail>
							</Col>
						</div>
					)
				}
				return("")
			});
		}

		return (
			<center className="bg">
				<div>
          <form className="search_form">
            <h1><b>SEARCH TRIP</b></h1><br/>
            <FormGroup bsSize="large">
              <FormControl className="search_box" type="text" placeholder="Enter text" />
            </FormGroup>
            <Button className="search_btn" >ADD DAY</Button>
          </form>
					<h1 className="topic"><b> ALL TRIPS </b></h1>
					<Grid>
     				<Row>
						{triprow}
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
