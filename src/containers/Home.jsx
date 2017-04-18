import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Home.css'
import SlideShow from '../components/SlideShow'
import { Row, Col, Thumbnail, Grid } from 'react-bootstrap'
import { Link } from 'react-router'

class Home extends Component {

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
				<div className="page">
					<SlideShow />
					<h1 className="topic"><b><hr/> ALL TRIPS <hr/></b></h1>
					<Grid>
     				<Row>
						{triprow}
						</Row>
					</Grid>
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

Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default Home
