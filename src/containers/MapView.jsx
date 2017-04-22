import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/MapView.css'
import { Button, Col, Modal, Glyphicon, Panel } from 'react-bootstrap'
import TripInfo from '../components/TripInfo'
import { Link } from 'react-router'

class MapView extends Component {

  constructor(props) {
    super(props);
    var trip = props.tripInfo.allTrips[props.routeParams.tripKey]
    this.state = {
      trip: trip === undefined ? {} : trip,
    };
    this.updateTripInfo = this.updateTripInfo.bind(this)
  }

  componentWillReceiveProps(newProps) {
      var trip = newProps.tripInfo.allTrips[this.props.routeParams.tripKey]
      this.setState({ trip: trip })
  }

  updateTripInfo(e) {
    var trip = this.state.trip
    trip.name = e.name
    trip.detail = e.detail
    this.props.onUpdateTrip(this.state.trip, this.props.routeParams.tripKey)
    this.close()
  }

  render() {
    return (
      <center className="bg">
      <div>
        <TripInfo {...{tripInfo: this.state.trip, callBack: this.updateTripInfo}} />
        <Col md={12}>
          <Link to={ `/${this.props.routeParams.tripKey}/edit/timeline`}>
            <Button className="map_view" bsSize="large" active>TIMELINE VIEW</Button>
          </Link>
        </Col>
        <Col className="map_box" md={12}>
          <br />TRIP TRIP TRIP<br />
        </Col>
      </div>
      </center>
    )
  }
}

const mapStateToProps = (state) => ({
  tripInfo: state.trips
})

const mapDispatchToProps = (dispatch) => ({

})

MapView = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapView)

export default MapView
