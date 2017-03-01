import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Timeline.css'
import * as firebase from 'firebase'
//import { reduxForm, formValueSelector } from 'redux-form'
import TimelineForm from '../components/TimelineForm'
import { Button, Glyphicon, Tabs, Tab, Panel } from 'react-bootstrap'
import TripInfo from '../components/TripInfo'
import { addTimeline } from '../actions/addTimeline'
import { getTimeline } from '../actions/getTimeline'

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
    console.log(this.state.trip)
  }

  addTravel(input, event) {
    event.preventDefault();
    console.log(input.day)
    var nameInput = this.refs.name.value;
    var newList = {name: nameInput, time: "11 AM"}
    this.state.trip[input.day-1].travel.push(newList)
    this.setState({trip: this.state.trip})
    this.refs.name.value = "";
    console.log(this.state.trip)
  }

  render() {
    //console.log(this.state.trip)

    return (
      <center className="bg">
      <div className="page">
        <TripInfo tripInfo={this.props.tripInfo} />

        <button onClick={ () => this.appendInput() }>ADD</button>

        {
          this.state.trip.map(input => 
            <div key={input.day}>
              <h1>Day {input.day}</h1>
              {
                this.state.trip[input.day-1].travel.map(aaa => <div key={input.day+aaa.name}>{aaa.time} --- {aaa.name}</div>)
              }
              <form onSubmit={this.addTravel.bind(this, input)} >
                <input placeholder="name" ref="name" />
                <button>Add</button>
              </form>
            </div>
          )
        }

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