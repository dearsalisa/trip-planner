import React, { Component } from 'react'
import '../css/Profile.css'
import * as firebase from 'firebase'
import UserInfo from '../components/UserInfo'
import TripBox from '../components/TripBox'
import { Button, Glyphicon, Tabs, Tab } from 'react-bootstrap'

class Profile extends Component {

  render() {
    return (
      <div>
        <UserInfo />
        <center>
          <Button className="new_trip" bsStyle="primary" bsSize="large" active><Glyphicon glyph="plus" /> NEW TRIP</Button>
        </center>
        <Tabs className="tab_header" defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab className="tab_content" eventKey={1} title="MY TRIP">
            <TripBox className="trip_box" />
            <TripBox className="trip_box" />
          </Tab>
          <Tab className="tab_content" eventKey={2} title="STORE">STORE</Tab>
        </Tabs>
      </div>
    )
  }

}

export default Profile
