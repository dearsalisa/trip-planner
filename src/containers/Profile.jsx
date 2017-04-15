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
    var userId = props.routeParams.userId
    var user = userId === undefined ? props.user : (props.allUsers[userId] !== undefined ? props.allUsers[userId] : {})
    this.state = {
      open: false,
      user: user
    };
  }

  componentWillReceiveProps(newProps) {
    var userId = newProps.routeParams.userId
    var user = userId === undefined ? newProps.user : (newProps.allUsers[userId] !== undefined ? newProps.allUsers[userId] : {})
    this.setState({user: user})
  }

  render() {
    console.log(this.state.user)
    var item = this.state.user.trips
    var trip = this.props.trips
    var isEdit = !(this.props.routeParams.userId !== undefined)

    if(item !== null && item !== undefined) {
      var triprow = Object.keys(item).map(function(key, index) {
        var tripId = item[key]
        if(tripId !== undefined && trip[tripId] !== undefined) {
          return(
            <Col sm={6} key={key} >
              <TripBox className="trip_box"  tripKey={tripId} trip={trip[tripId]} isEdit={ isEdit } />
            </Col>
          )
        }
        return("")
      });
    }

    item = this.state.user.like
    if(item !== null && item !== undefined) {
      var likerow = Object.keys(item).map(function(key, index) {
        var tripId = item[key]
        if(tripId !== undefined && trip[tripId] !== undefined) {
          return(
            <Col sm={6} key={key} >
              <TripBox className="trip_box"  tripKey={tripId} trip={trip[tripId]} isEdit={ isEdit } />
            </Col>
          )
        }
        return("")
      });
    }

    return (
      <center className="bg" >
        <div className="page">
          <UserInfo {...this.state.user}/>
          <Button className="new_trip" bsSize="large" onClick={ ()=> this.setState({ open: !this.state.open })} active>
            <Glyphicon glyph="plus" /> CREATE NEW TRIP
          </Button>
          <Panel className="trip_form" collapsible expanded={this.state.open}>
            <TripForm {...this.props} />
          </Panel>
          <br/><br/><br/><br/>
            <div className="content">
              <Tabs className="tab_header" defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab className="tab_content" eventKey={1} title="TRIPS">
                  {triprow}
                </Tab>
                <Tab className="tab_content" eventKey={2} title="STORE">
                  STORE
                </Tab>
                <Tab className="tab_content" eventKey={3} title="LIKES">
                  {likerow}
                </Tab>
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
  user: state.auth.user,
  allUsers: state.auth.allUsers
})

const mapDispatchToProps = (dispatch) => ({

})

Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default Profile
