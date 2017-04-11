import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Timeline.css'
import { Button, Col, Modal } from 'react-bootstrap'
import TripInfo from '../components/TripInfo'
import Edit from '../components/Edit'
import { updateTrip } from '../actions/tripAction'

class Timeline extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      addingDay: -1,
      trip: {}
    };
    this.updateTravel = this.updateTravel.bind(this)
    this.addTravel = this.addTravel.bind(this)
    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
  }

  close() {
    this.setState({ showModal: false, addingDay: -1 });
  }

  open(day) {
    this.setState({ showModal: true, addingDay: day });
  }

  componentWillReceiveProps(newProps) {
      var trip = newProps.tripInfo.allTrips[this.props.routeParams.tripKey]
      this.setState({ trip: trip })
  }

  appendInput() {
    if(this.state.trip.timeline === undefined) {
      this.state.trip.timeline = []
    }
    var newInput = `${this.state.trip.timeline.length + 1}`
    var newDate = {day: newInput, travel: []}
    this.state.trip.timeline.push(newDate)
    this.setState({ trip: this.state.trip })
    this.props.onUpdateTrip(this.state.trip, this.props.routeParams.tripKey)
  }

  addTravel() {
    var day = this.state.addingDay
    var newList = {
      name: this.refs.name.value,
      time: this.refs.time.value
    }
    var timeline = this.state.trip.timeline
    if(timeline[day-1].travel === undefined) {
      timeline[day-1].travel = []
    }
    timeline[day-1].travel.push(newList)
    this.setState({trip: this.state.trip})
    this.refs.name.value = "";
    this.props.onUpdateTrip(this.state.trip, this.props.routeParams.tripKey)
    this.close()
  }

  updateTravel(e) {
    var updateList = {name: e.name, time: e.time}
    this.state.trip.timeline[e.day-1].travel[e.index] = updateList
    this.props.onUpdateTrip(this.state.trip, this.props.routeParams.tripKey)
  }

  removeTravel(day, index) {
    delete this.state.trip.timeline[day-1].travel[index]
    this.props.onUpdateTrip(this.state.trip, this.props.routeParams.tripKey)
  }

  removeDay(day) {
    delete this.state.trip.timeline[day-1]
    this.state.trip.timeline = this.state.trip.timeline
    .filter( (x) => {return x !== undefined})
    .map( (x,index) => {
      x.day = index+1
      return x
    })
    this.props.onUpdateTrip(this.state.trip, this.props.routeParams.tripKey)
  }

  render() {
    return (
      <center className="bg">
      <div className="page">
        <TripInfo tripInfo={this.state.trip} />
        <Col className="left_box" md={4}>TRIP</Col>
        <Col className="right_box" md={8}>
          {
            this.state.trip.timeline !== undefined ?
            this.state.trip.timeline.map(input =>
              <div key={input.day}>
                <h3 className="day" >Day {input.day}
                  <a onClick={this.removeDay.bind(this, input.day)}> (x) </a>
                </h3>
                {
                  this.state.trip.timeline[parseInt(input.day)-1].travel !== undefined ?
                  this.state.trip.timeline[parseInt(input.day)-1].travel
                    .sort( (i,j) => { return i.time > j.time})
                    .map((item,index) =>
                      <div className="event_form" key={input.day+item.name}>
                        <h4>
                          <b>{item.time}</b>
                          <Edit {
                            ...{
                              item: item,
                              day: input.day,
                              index: index,
                              callBack: this.updateTravel
                            }
                          } />
                        <a onClick={this.removeTravel.bind(this, input.day, index)}> (x) </a>
                        </h4>
                        <h4>{item.name}</h4>
                      </div>
                  ) : ""
                }

                <div>
                  <button onClick={ () => this.open(input.day)} > Add </button>
                  <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add TimeLine {input.day} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form className="timeline_form">
                        <div className="time">
                          <label>Time</label>
                          <select  ref="time" placeholder="select time">
                            <option value="09:00">09:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                          </select>
                        </div>
                        <input placeholder="name" ref="name" />
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={this.addTravel}>Add</Button>
                      <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            ) : ""
          }
          <center>
            <Button className="add_day" bsStyle="primary" onClick={ () => this.appendInput() }>ADD DAY</Button>
          </center>
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
  onUpdateTrip(trip, key) {
    dispatch(updateTrip({trip: trip, trip_id: key}))
  }
})

Timeline = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline)

export default Timeline
