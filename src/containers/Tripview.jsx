import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Tripview.css'
import TripInfoView from '../components/TripInfoView'
import { Button, Glyphicon, Col } from 'react-bootstrap'

class Tripview extends Component {

  constructor(props) {
    super(props);
    var trip = props.tripInfo.allTrips[props.routeParams.tripKey]
    this.state = {
      trip: trip === undefined ? {} : trip,
      trip_id: props.routeParams.tripKey
    }
  }

  componentWillReceiveProps(newProps) {
      var trip = newProps.tripInfo.allTrips[this.props.routeParams.tripKey]
      this.setState({ trip: trip })
  }

  render() {
    return (
      <center className="bg">
        <div className="page">
          <TripInfoView { ...this.state } />
            <Col className="left_box" md={4}>TRIP</Col>
            <Col className="right_box" md={8}>
              {
                this.state.trip.timeline !== undefined ?
                this.state.trip.timeline.map(input =>
                  <div key={input.day}>
                    <h3 className="day"> Day {input.day}</h3>
                    {
                      this.state.trip.timeline[parseInt(input.day)-1].travel !== undefined ?
                      this.state.trip.timeline[parseInt(input.day)-1].travel
                        .sort( (i,j) => { return i.time > j.time})
                        .map((item,index) =>
                          <div className="event_box" key={input.day+item.name}>
                            <div className="name">
                              <h4><span className="circle"></span><b>{item.time}</b> {item.name} </h4>
                            </div>
                            <div className="square">
                              <div className="trip_text">
                                {
                                  item.image !== undefined ?
                                  <img className="pic" role="presentation" src={item.image}/>: ""
                                }
                                <h5 className="detail">{item.detail}</h5>
                              </div>
                            </div>
                          </div>
                      ) : <div className="event_form"><h5>no event</h5></div>
                    }
                  </div>
                ) : ""
              }
            </Col>
        </div>
      </center>
    )
  }
}

const mapStateToProps = (state) => ({
    tripInfo: state.trips,
    user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({

})

Tripview = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tripview)

export default Tripview
