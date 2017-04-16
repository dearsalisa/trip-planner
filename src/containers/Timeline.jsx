import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Timeline.css'
import { Button, Col, Modal, Glyphicon } from 'react-bootstrap'
import TripInfo from '../components/TripInfo'
import Edit from '../components/Edit'
import { updateTrip } from '../actions/tripAction'
import { uploadImage } from '../actions/firebaseAction'

class Timeline extends Component {

  constructor(props) {
    super(props);

    var trip = props.tripInfo.allTrips[props.routeParams.tripKey]
    this.state = {
      showModal: false,
      addingDay: -1,
      trip: trip === undefined ? {} : trip
    };

    this.updateTravel = this.updateTravel.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.addTravel = this.addTravel.bind(this)
    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
  }

  close() {
    this.setState({ showModal: false, addingDay: -1 });
  }

  open(day) {
    this.setState({ showModal: true, addingDay: day });
  }

  componentWillReceiveProps(newProps) {
      var trip = newProps.tripInfo.allTrips[this.props.routeParams.tripKey]
      this.setState({ trip: trip })
  }

  appendInput() {
    if(this.state.trip.timeline === undefined) {
      this.state.trip.timeline = []
    }
    var newInput = `${this.state.trip.timeline.length + 1}`
    var newDate = {day: newInput, travel: []}
    this.state.trip.timeline.push(newDate)
    this.setState({ trip: this.state.trip })
    this.props.onUpdateTrip(this.state.trip, this.props.routeParams.tripKey)
  }

  uploadImage(image, obj, after) {
    if(image !== undefined) {
      this.props.onUploadImage(image).then((imageURL) => {
        obj.image = imageURL
        after(obj)
      })
    } else {
      after(obj)
    }
  }

  addTravel() {
    var newList = {
      name: this.refs.name.value,
      time: this.refs.time.value,
      detail: this.refs.detail.value
    }

    this.uploadImage(this.refs.myFile.files[0], newList, (obj) => {
      var day = this.state.addingDay

      var timeline = this.state.trip.timeline
      if(timeline[day-1].travel === undefined) {
        timeline[day-1].travel = []
      }
      timeline[day-1].travel.push(obj)
      this.setState({trip: this.state.trip})
      this.refs.name.value = ""
      this.refs.detail.value = "";
      this.props.onUpdateTrip(this.state.trip, this.props.routeParams.tripKey)
      this.close()
    })

  }

  updateTravel(e) {
    var updateList = {name: e.name, time: e.time, detail: e.detail}

    this.uploadImage(e.image, updateList, (obj) => {
      this.state.trip.timeline[e.day-1].travel[e.index] = obj
      this.props.onUpdateTrip(this.state.trip, this.props.routeParams.tripKey)
    })
  }

  removeTravel(day, index) {
    delete this.state.trip.timeline[day-1].travel[index]
    this.props.onUpdateTrip(this.state.trip, this.props.routeParams.tripKey)
  }

  removeDay(day) {
    delete this.state.trip.timeline[day-1]
    this.state.trip.timeline = this.state.trip.timeline
    .filter( (x) => {return x !== undefined})
    .map( (x,index) => {
      x.day = index+1
      return x
    })
    this.props.onUpdateTrip(this.state.trip, this.props.routeParams.tripKey)
  }

  render() {
    return (
      <center className="bg">
      <div className="page">
        <TripInfo tripInfo={this.state.trip} />
        <Col className="left_box" md={4}>
          <br />TRIP TRIP TRIP<br />
        </Col>
        <Col className="right_box" md={8}>
          {
            this.state.trip.timeline !== undefined ?
            this.state.trip.timeline.map(input =>
              <div key={input.day}>
                <h3 className="day" >Day {input.day}
                  <span onClick={this.removeDay.bind(this, input.day)}>
                    <Glyphicon className="remove" glyph="remove" />
                  </span>
                </h3>
                {
                  this.state.trip.timeline[parseInt(input.day)-1].travel !== undefined ?
                  this.state.trip.timeline[parseInt(input.day)-1].travel
                    .sort( (i,j) => { return i.time > j.time})
                    .map((item,index) =>
                      <div className="event_box" key={input.day+item.name}>
                        <h4>
                          <b>{item.time}</b>
                          <Edit {
                            ...{
                              item: item,
                              day: input.day,
                              index: index,
                              callBack: this.updateTravel
                            }
                          } />
                          <span onClick={this.removeTravel.bind(this, input.day, index)}>
                            <Glyphicon className="remove" glyph="remove" />
                          </span>
                        </h4>
                        <h4>{item.name}</h4>
                        {
                          item.image !== undefined ?
                          <img className="pic" role="presentation" src={item.image}/> : ""
                        }
                        <h5>{item.detail}</h5>
                      </div>
                  ) : ""
                }

                <div>
                  <div className="add_event">
                    <Button className="add_event_btn" onClick={ () => this.open(input.day)} > NEW EVENT </Button>
                  </div>
                  <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add TimeLine {input.day} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form className="timeline_form">
                        <div className="time">
                          <label>Time</label><br />
                          <select  ref="time" placeholder="select time">
                            <option value="09:00">09:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                          </select>
                        </div>
                        <label>Name</label><br />
                        <input placeholder="name" ref="name" /><br />
                        <label>Comment</label><br />
                        <textarea ref="detail" rows="5"></textarea><br />
                        <label>Select a file to upload </label>
                        <input type="file" ref="myFile" size="50" />
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={this.addTravel}>Add</Button>
                      <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            ) : ""
          }
          <center>
            <Button className="add_day" onClick={ () => this.appendInput() }>ADD DAY</Button>
          </center>
        </Col>
      </div>
      </center>
    )
  }
}

const mapStateToProps = (state) => ({
  tripInfo: state.trips
})

const mapDispatchToProps = (dispatch) => ({
  onUpdateTrip(trip, key) {
    dispatch(updateTrip({trip: trip, trip_id: key}))
  },

  onUploadImage(file) {
    return dispatch(uploadImage({file: file}))
  }
})

Timeline = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline)

export default Timeline
