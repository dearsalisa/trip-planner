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
								<div  className="box">
									<img className="home_pic" role="presentation" src={require('../images/home03.jpg')}/>
									<Link to={`/tripview/${key}`}>
										<h4><b>{item[key].name}</b></h4>
									</Link>
									<h5 className="text">{item[key].detail}</h5>
								</div>
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
					<h1 className="topic"><b>ALL TRIPS</b></h1>
					<Row className="show-grid">
						{triprow}
					</Row>
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
