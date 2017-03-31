import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Tripview.css'
import * as firebase from 'firebase'
import { reduxForm, formValueSelector } from 'redux-form'
import { Button, Glyphicon, Tabs, Tab, Panel } from 'react-bootstrap'

import { getTripbyId } from '../actions/getTripbyId'

//var eiei = this.props.params.tripKey

class Tripview extends Component {

  componentWillMount(){
    this.props.getTripbyId(this.props.params.tripKey)
  }

  render() {


    return (
      <center className="bg">
        <div className="page">
          <div className="trip_header">
            <h2>{this.props.tripbyId.name}</h2>
            <h4>{this.props.tripbyId.detail}</h4>
          </div>
        </div>
      </center>
    )
  }

}

// Timeline = reduxForm({
//   form: 'addtrip'
// })(Profile)

const mapStateToProps = (state) => ({
  tripbyId: state.tripbyId.get.data
})

const mapDispatchToProps = (dispatch) => ({
  getTripbyId(tripKey) {
    dispatch(getTripbyId(tripKey))
  }
})

Tripview = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tripview)

export default Tripview
