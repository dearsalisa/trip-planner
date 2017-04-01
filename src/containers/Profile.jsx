import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Profile.css'
import * as firebase from 'firebase'
import { reduxForm, formValueSelector } from 'redux-form'
import UserInfo from '../components/UserInfo'
import TripBox from '../components/TripBox'
import TripForm from '../components/TripForm'
import { Button, Glyphicon, Tabs, Tab, Panel } from 'react-bootstrap'
import { getTrips } from '../actions/getTrips'

class Profile extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      open: false
    };
  }

  componentWillMount(){
    this.props.getTrips()
  }

  render() {
    var item = this.props.trips.allTrips
    var triprow = Object.keys(item).map(function(key, index) {
      if(item[key] !== undefined) {
        return(
          <TripBox className="trip_box" key={key} tripKey={key} name={item[key].name} detail={item[key].detail} />
        )
      }
    });

    return (
      <center className="bg" >
        <div className="page">

          <UserInfo {...this.props.user}/>

          <Button className="new_trip" bsStyle="primary" bsSize="large" onClick={ ()=> this.setState({ open: !this.state.open })} active>
            <Glyphicon glyph="plus" /> NEW TRIP
          </Button>
          <Panel className="trip_form" collapsible expanded={this.state.open}>
            <TripForm {...this.props} />
          </Panel>

          <div className="content">
          <Tabs className="tab_header" defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab className="tab_content" eventKey={1} title="MY TRIP">
              {triprow}
            </Tab>
            <Tab className="tab_content" eventKey={2} title="STORE">STORE</Tab>
          </Tabs>
          </div>
        </div>
      </center>
    )
  }
}

Profile = reduxForm({
  form: 'addtrip'
})(Profile)

const mapStateToProps = (state) => ({
  trips: state.trips,
  user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
  getTrips() {
    dispatch(getTrips())
  }
})

Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default Profile
