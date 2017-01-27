import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Timeline.css'
import * as firebase from 'firebase'
import { reduxForm, formValueSelector } from 'redux-form'
import UserInfo from '../components/UserInfo'
import TripBox from '../components/TripBox'
import TripForm from '../components/TripForm'
import { Button, Glyphicon, Tabs, Tab, Panel } from 'react-bootstrap'
import { addTrip } from '../actions/addTrip'
import TripInfo from '../components/TripInfo'

class Timeline extends Component {

  render() {
    return (
      <center className="bg">
      <div className="page">
        <TripInfo />
        <h1>timeline</h1>
      </div>
      </center>
    )
  }

}

// Profile = reduxForm({
//   form: 'addtrip'
// })(Profile)

// const mapStateToProps = (state) => ({
//   tripInfo: state.tripInfo.get.data
// })

// const mapDispatchToProps = (dispatch) => ({
//   onSubmit(values) {
//     dispatch(addTrip(values))
//   }
// })

// Profile = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Profile)

export default Timeline
