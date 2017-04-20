import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Home.css'
import SlideShow from '../components/SlideShow'
import Footer from '../components/Footer'
import { Row, Col, Thumbnail, Grid } from 'react-bootstrap'
import { Link } from 'react-router'
import TripRow from '../components/TripRow'

class Home extends Component {

	render() {
		var article = this.props.allArt

		if(article !== null) {
			var articleRow = Object.keys(article).map(function(key) {
				var eiei = article[key]
				if(eiei.name !== undefined){
					return(
						<div key={key}>
							<Col xs={4} md={4}>
								<img width={150} height={100} role="presentation" src={eiei.image}/>
								<h4 className="link_trip">{eiei.name}</h4>
								<p>{eiei.text}</p>
							</Col>
						</div>
					)
				}
				return("")
			})
		}

		return (
			<center className="bg">
				<div className="page">
					<SlideShow />
					<h1 className="topic"><b> RECOMMENTED </b></h1>
					<Grid>
     				<Row>
							{articleRow}
						</Row>
					</Grid>
					<h1 className="topic"><b> ALL TRIPS </b></h1>
					<Grid>
     				<Row>
							<TripRow trips={this.props.trips} allUsers={this.props.allUsers} />
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
	allUsers: state.auth.allUsers,
	allArt: state.article.allArt
})

const mapDispatchToProps = (dispatch) => ({

})

Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default Home
