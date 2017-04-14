import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Profile.css'
import { reduxForm } from 'redux-form'
import UserInfo from '../components/UserInfo'
import TripBox from '../components/TripBox'
import TripForm from '../components/TripForm'
import { Button, Glyphicon, Tabs, Tab, Panel, Col } from 'react-bootstrap'

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    var item = this.props.user.trip
    var trip = this.props.trips
    if(item !== null) {
      var triprow = Object.keys(item).map(function(key, index) {
        var tripId = item[key]
        if(tripId !== undefined && trip[tripId] !== undefined) {
          return(
            <Col sm={6} key={key} >
              <TripBox className="trip_box"  tripKey={tripId} trip={trip[tripId]} />
            </Col>
          )
        }
        return("")
      });
    }
    return (
      <center className="bg" >
        <div className="page">
          <UserInfo {...this.props.user}/>

          <Button className="new_trip" bsSize="large" onClick={ ()=> this.setState({ open: !this.state.open })} active>
            <Glyphicon glyph="plus" /> CREATE NEW TRIP
          </Button>
          <Panel className="trip_form" collapsible expanded={this.state.open}>
            <TripForm {...this.props} />
          </Panel>
          <br/><br/><br/><br/>
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
  trips: state.trips.allTrips,
  user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({

})

Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default Profile
