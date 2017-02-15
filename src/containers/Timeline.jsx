import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Timeline.css'
import * as firebase from 'firebase'
import { reduxForm, formValueSelector } from 'redux-form'
import TimelineForm from '../components/TimelineForm'
import { Button, Glyphicon, Tabs, Tab, Panel } from 'react-bootstrap'
//import { addTrip } from '../actions/addTrip'
import TripInfo from '../components/TripInfo'

class Timeline extends Component {

  render() {
    //console.log(this.props.tripInfo)
    var oneDay = 24*60*60*1000;
    var firstDate = new Date(this.props.tripInfo[3]);
    var secondDate = new Date(this.props.tripInfo[4]);
    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));

    var rows = [];
    for(var i=1; i<=5; i++){
        rows.push(
          <div key={i}>
            <h1>Day {i}</h1>
            <TimelineForm />
          </div>
        );
    }

    return (
      <center className="bg">
      <div className="page">
        <TripInfo tripInfo={this.props.tripInfo} />
        {rows}
      </div>
      </center>
    )
  }

}

Timeline = reduxForm({
  form: 'addtimeline'
})(Timeline)

const mapStateToProps = (state) => ({
  tripInfo: state.tripInfo.get.data
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit(values) {
    dispatch()
  }
})

Timeline = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline)

export default Timeline
