import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Timeline.css'
//import { Button, Glyphicon, Tabs, Tab, Panel, Col, FormGroup, ControlLabel, FormControl, option } from 'react-bootstrap'
import { Button, Col } from 'react-bootstrap'
import TripInfo from '../components/TripInfo'
import Edit from '../components/Edit'
//import { addTimeline } from '../actions/addTimeline'
//import { getTimeline } from '../actions/getTimeline'

class Timeline extends Component {

  constructor(props) {
    super(props);
    this.state = { trip: [] };
  }

  appendInput() {
    var newInput = `${this.state.trip.length + 1}`
    var newDate = {day: newInput, travel: []}
    this.state.trip.push(newDate)
    this.setState({trip: this.state.trip})
    //console.log(this.state.trip)
  }

  addTravel(input, event) {
    event.preventDefault();
    console.log(input.day);

    var x = "name"+input.day
    var nameInput = this.refs[x].value;

    var y = "time"+input.day
    var timeInput = this.refs[y].value;

    var newList = {name: nameInput, time: timeInput}

    this.state.trip[input.day-1].travel.push(newList)
    this.setState({trip: this.state.trip})
    this.refs[x].value = "";
    //console.log(this.state.trip)
  }

  render() {
    //console.log(this.state.trip)

    return (
      <center className="bg">
      <div className="page">
        <TripInfo tripInfo={this.props.tripInfo} />
        <Col className="left_box" md={4}>TRIP</Col>
        <Col className="right_box" md={8}>
          {
            this.state.trip.map(input =>
              <div key={input.day}>
                <h2 className="day" >Day {input.day}</h2>
                {
                  this.state.trip[input.day-1].travel.map(aaa =>
                    <div className="event_form" key={input.day+aaa.name}>

                      <h4><b>{aaa.time}</b><Edit /></h4>
                      <h4>{aaa.name}</h4>
                    </div>
                  )
                }
                <form className="timeline_form" onSubmit={this.addTravel.bind(this, input)} >
                  <div className="time" >
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
            )
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
  tripInfo: state.tripInfo.get.data,
  timeline: state.timeline.get.data
})

const mapDispatchToProps = (dispatch) => ({
  getTimeline(mykey) {
    //dispatch(getTimeline(mykey))
  },
  onSubmit(values) {
    console.log(values)
    //dispatch(addTimeline(values))
  }
})

Timeline = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline)

export default Timeline

// <button onClick= {() => this.addTravel(input.day, "eiei") }> Add Travel </button>
