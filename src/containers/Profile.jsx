import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Profile.css'
import * as firebase from 'firebase'
import { reduxForm, formValueSelector } from 'redux-form'
import UserInfo from '../components/UserInfo'
import TripBox from '../components/TripBox'
import TripForm from '../components/TripForm'
import { Button, Glyphicon, Tabs, Tab, Panel } from 'react-bootstrap'
import { addTrip } from '../actions/addTrip'

class Profile extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      open: false
    };
  }

  render() {
    return (
      <center className="bg" >
      <div className="page">
      
        <UserInfo />
        
        <Button className="new_trip" bsStyle="primary" bsSize="large" onClick={ ()=> this.setState({ open: !this.state.open })} active>
          <Glyphicon glyph="plus" /> NEW TRIP
        </Button>
        <Panel className="trip_form" collapsible expanded={this.state.open}>
          <TripForm {...this.props} />
        </Panel>
        
        <div className="content">
        <Tabs className="tab_header" defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab className="tab_content" eventKey={1} title="MY TRIP">
            <TripBox className="trip_box" />
            <TripBox className="trip_box" />
          </Tab>
          <Tab className="tab_content" eventKey={2} title="STORE">STORE</Tab>
        </Tabs>
        </div>

      </div></center>
    )
  }
}

Profile = reduxForm({
  form: 'addtrip'
})(Profile)

const mapStateToProps = (state) => ({
  tripInfo: state.tripInfo.get.data
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit(values) {
    dispatch(addTrip(values))
  }
})

Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default Profile
