import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Timeline.css'
//import { Button, Glyphicon, Tabs, Tab, Panel, Col, FormGroup, ControlLabel, FormControl, option } from 'react-bootstrap'
import { Button, Col } from 'react-bootstrap'
import TripInfo from '../components/TripInfo'
import Edit from '../components/Edit'
import { updateTrip } from '../actions/tripAction'

class Timeline extends Component {

  constructor(props) {
    super(props);
    this.state = { trip: {} };
    this.updateTravel = this.updateTravel.bind(this)
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
    //console.log(this.state.trip)
    this.props.onUpdateTrip(this.state.trip, this.props.routeParams.tripKey)
  }

  addTravel(input, event) {
    event.preventDefault();
    console.log(input.day);

    var x = "name"+input.day
    var nameInput = this.refs[x].value;

    var y = "time"+input.day
    var timeInput = this.refs[y].value;

    var newList = {name: nameInput, time: timeInput}

    if(this.state.trip.timeline[input.day-1].travel === undefined) {
      this.state.trip.timeline[input.day-1].travel = []
    }
    this.state.trip.timeline[input.day-1].travel.push(newList)
    this.setState({trip: this.state.trip})
    this.refs[x].value = "";
    this.props.onUpdateTrip(this.state.trip, this.props.routeParams.tripKey)
    //console.log(this.state.trip)
  }

  updateTravel(e) {
    console.log(e)
    var updateList = {name: e.name, time: e.time}
    this.state.trip.timeline[e.day-1].travel[e.index] = updateList
    this.props.onUpdateTrip(this.state.trip, this.props.routeParams.tripKey)
  }

  render() {
    console.log(this.state)
    return (
      <center className="bg">
      <div className="page">
        <TripInfo tripInfo={this.state.trip} />
        <Col className="left_box" md={4}>TRIP</Col>
        <Col className="right_box" md={8}>
          {
            this.state.trip.timeline !== undefined ? this.state.trip.timeline.map(input =>
              <div key={input.day}>
                <h2 className="day" >Day {input.day}</h2>
                {
                  this.state.trip.timeline[parseInt(input.day)-1].travel !== undefined ?
                  this.state.trip.timeline[parseInt(input.day)-1].travel.map((item,index) =>
                    <div className="event_form" key={input.day+item.name}>
                      <h4><b>{item.time}</b><Edit {
                        ...{
                          item: item,
                          day: input.day,
                          index: index,
                          callBack: this.updateTravel
                        }
                      } /></h4>
                      <h4>{item.name}</h4>
                    </div>
                  ) : ""
                }
                <form className="timeline_form" onSubmit={this.addTravel.bind(this, input)} >
                  <div className="time">
                    <label>Time</label>
                    <select  ref={"time"+input.day} placeholder="select time">
                      <option value="9:00">9:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                    </select>
                  </div>
                  <input placeholder="name" ref={"name"+input.day} />
                  <button>Add</button>
                </form>
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
    //console.log(trip)
    dispatch(updateTrip({trip: trip, trip_id: key}))
  },
  onSubmit(values) {
    //console.log(values)
    //dispatch(addTimeline(values))
  }
})

Timeline = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline)

export default Timeline

// <button onClick= {() => this.addTravel(input.day, "eiei") }> Add Travel </button>
