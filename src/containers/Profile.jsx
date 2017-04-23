import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Profile.css'
import { reduxForm } from 'redux-form'
import UserInfo from '../components/UserInfo'
import TripBox from '../components/TripBox'
import TripForm from '../components/TripForm'
import { Button, Glyphicon, Tabs, Tab, Modal, Col } from 'react-bootstrap'
import { removeTrip, addTrip } from '../actions/tripAction'

class Profile extends Component {

  constructor(props) {
    super(props);
    var userId = props.routeParams.userId
    var user = userId === undefined ? props.user : (props.allUsers[userId] !== undefined ? props.allUsers[userId] : {})
    this.state = {
      showModal: false,
      user: user
    };
    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
    this.addTravel = this.addTravel.bind(this)
    this.removeTripAction = this.removeTripAction.bind(this)
  }

  componentWillReceiveProps(newProps) {
    var userId = newProps.routeParams.userId
    var user = userId === undefined ? newProps.user : (newProps.allUsers[userId] !== undefined ? newProps.allUsers[userId] : {})
    this.setState({user: user})
  }

  close() { this.setState({ showModal: false, addingDay: -1 }); }
  open() { this.setState({ showModal: true }); }

  addTravel() {
    this.props.onSubmitTrip(this.refs.name.value, this.refs.detail.value, this.props.user.uid)
    this.close()
  }

  removeTripAction(trip_id) {
		this.props.onRemoveTrips(trip_id, this.props.user.uid)
	}

  render() {
    var item = this.props.myTrips
    var trip = this.props.trips
    var isEdit = !(this.props.routeParams.userId !== undefined)
    var removeAction = this.removeTripAction

    if(item !== null && item !== undefined) {
      var triprow = Object.keys(item).map(function(key, index) {
        var tripId = item[key]
        if(tripId !== undefined && trip[tripId] !== undefined && trip[tripId].dup_id === undefined) {
          return(
            <Col sm={6} key={key} >
              <TripBox className="trip_box"
                tripKey={tripId}
                trip={trip[tripId]}
                isEdit={ isEdit }
                removeAction={ () => removeAction(tripId)} />
            </Col>
          )
        }
        return("")
      });
    }

    if(item !== null && item !== undefined) {
      var duprow = Object.keys(item).map(function(key, index) {
        var tripId = item[key]
        if(tripId !== undefined && trip[tripId] !== undefined && trip[tripId].dup_id !== undefined) {
          return(
            <Col sm={6} key={key} >
              <TripBox className="trip_box"
                tripKey={tripId}
                trip={trip[tripId]}
                isEdit={ isEdit }
                removeAction={ () => removeAction(tripId)} />
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
              <TripBox className="trip_box"
                tripKey={tripId}
                trip={trip[tripId]}
                isEdit={ false } />
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
          <Button className="new_trip" bsSize="large" onClick={ () => this.open()} active>
            <Glyphicon glyph="plus" /> CREATE NEW TRIP
          </Button>
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>NEW TRIP</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="timeline_form">
                <label>Name </label>
                <input placeholder="name" ref="name" /><br />
                <label>Detail </label>
                <input placeholder="detail" ref="detail" /><br />
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.addTravel}>Save</Button>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>

          <br/><br/><br/><br/>
            <div className="content">
              <Tabs className="tab_header" defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab className="tab_content" eventKey={1} title="TRIPS">
                  {triprow}
                </Tab>
                <Tab className="tab_content" eventKey={2} title="STORE">
                  {duprow}
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
  allUsers: state.auth.allUsers,
  myTrips: state.trips.myTrips,
  likeTrips: state.trips.likeTrips
})

const mapDispatchToProps = (dispatch) => ({
  onSubmitTrip(name, detail, user) {
    dispatch(addTrip({name: name, detail: detail, user: user}))
  },
  onRemoveTrips(trip_id, user_id) {
		dispatch(removeTrip({trip_id: trip_id, user_id: user_id }))
	}
})

Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default Profile
