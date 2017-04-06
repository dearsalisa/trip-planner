import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Home.css'
import SlideShow from '../components/SlideShow'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'

class Home extends Component {

	render() {
		var item = this.props.trips
		if(item !== null) {
			var triprow = Object.keys(item).map(function(key, index) {
				if(item[key] !== undefined) {
					return(
						<div key={key}>
							<Col xs={6} md={3}>
								<img className="home_pic" role="presentation" src={require('../images/home01.jpg')}/>
								<Link to={`/tripview/${key}`}>
									<h3 className="trip_name"><b>{item[key].name}</b></h3>
								</Link>
								<h4>{item[key].detail}</h4>
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
					<div className="home_content">
						<SlideShow />
						<br/><br/>

						<h1 className="topic">ALL TRIPS</h1>
						<hr />
						<Row className="show-grid">
							{triprow}
						</Row>

					</div>
				</div>
			</center>
		)
	}
}

const mapStateToProps = (state) => ({
  trips: state.trips.allTrips
})

const mapDispatchToProps = (dispatch) => ({

})

Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default Home
