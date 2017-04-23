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
		return (
			<center className="bg">
				<div className="page">
					<SlideShow />
					<h1 className="topic"><b> HOT TRIPS </b></h1>
					<Grid>
     				<Row>
							<Col xs={4} md={4}>
								<img width={150} height={100} role="presentation" src={require('../images/home06.jpg')}/>
								<h4><b>LASTEST PLANS</b></h4>
								<p>Lorem ipsum dolor sit amet consectetur adiing elit. In volutpat luctus eros ac placerat. Quisque erat metus facilisis non feu,aliquam hendrerit quam. Donec ut lectus vel dolor adipiscing tincnt.</p>
							</Col>
							<Col xs={4} md={4}>
								<img width={150} height={100} role="presentation" src={require('../images/home06.jpg')}/>
								<h4><b>LASTEST PLANS</b></h4>
								<p>Lorem ipsum dolor sit amet consectetur adiing elit. In volutpat luctus eros ac placerat. Quisque erat metus facilisis non feu,aliquam hendrerit quam. Donec ut lectus vel dolor adipiscing tincnt.</p>
							</Col>
							<Col xs={4} md={4}>
								<img width={150} height={100} role="presentation" src={require('../images/home06.jpg')}/>
								<h4><b>LASTEST PLANS</b></h4>
								<p>Lorem ipsum dolor sit amet consectetur adiing elit. In volutpat luctus eros ac placerat. Quisque erat metus facilisis non feu,aliquam hendrerit quam. Donec ut lectus vel dolor adipiscing tincnt.</p>
							</Col>
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
	allUsers: state.auth.allUsers
})

const mapDispatchToProps = (dispatch) => ({

})

Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default Home
