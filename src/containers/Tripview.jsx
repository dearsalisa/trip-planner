import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Tripview.css'
import TripInfoView from '../components/TripInfoView'
import { Button, Glyphicon, Col, Panel } from 'react-bootstrap'

class Tripview extends Component {

  constructor(props) {
    super(props);
    var trip = props.tripInfo.allTrips[props.routeParams.tripKey]
    this.state = {
      showModal: false,
      trip: trip === undefined ? {} : trip,
      trip_id: props.routeParams.tripKey,
      tripUrl: this.props.location.pathname
    }
    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
  }

  componentWillReceiveProps(newProps) {
      var trip = newProps.tripInfo.allTrips[this.props.routeParams.tripKey]
      this.setState({ trip: trip })
  }

  close() {
    this.setState({ showModal: false, addingDay: -1 });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <center className="bg">
        <div className="page">
          <TripInfoView {...this.state}  />
            <div className="tripview">
              {
                this.state.trip.timeline !== undefined ?
                this.state.trip.timeline.map(input =>
                  <div className="day_box" key={input.day}>
                    <Panel className="day" header={
                      <div>Day {input.day}</div>
                    }>
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
                                <h5>{item.location.name !== undefined ? "Location : "+item.location.name : ""}</h5>
                                {
                                  item.image !== undefined ?
                                  item.image.map((image, index) =>
                                    <img key={index} className="tl_pic" role="presentation" src={image}/>
                                  ) : ""
                                }
                                <h5 className="detail">{item.detail}</h5>
                                <a href={item.link}>{item.link}</a>
                                <h5>{item.mark}</h5>
                              </div>
                            </div>
                          </div>
                      ) : <div className="event_form"><h5>no event</h5></div>
                    }
                  </Panel>
                  </div>
                ) : ""
              }
            </div>
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
