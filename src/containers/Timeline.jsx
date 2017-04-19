import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Timeline.css'
import { Button, Col, Modal, Glyphicon, Panel } from 'react-bootstrap'
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
      trip: trip === undefined ? {} : trip,
      value: "00:00"
    };
    this.updateTravel = this.updateTravel.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.addTravel = this.addTravel.bind(this)
    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
  }

  close() { this.setState({ showModal: false, addingDay: -1 }); }
  open(day) { this.setState({ showModal: true, addingDay: day }); }

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

  uploadImage(images, obj, after) {
    if(images !== undefined) {
      var imagesURL = []
      var count = 0
      for(var i = 0; i < images.length; i++) {
        var image = images[i]
        this.props.onUploadImage(image).then((imageURL) => {
          imagesURL.push(imageURL)
          count++
          if(count === images.length) {
            console.log("UPLOAD_DONE")
            obj.image = imagesURL
            after(obj)
          }
        })
      }
    } else {
      after(obj)
    }
  }

  addTravel() {
    var event_time = this.refs.hour.value+":"+this.refs.minute.value
    var newList = {
      name: this.refs.name.value,
      time: event_time,
      detail: this.refs.detail.value,
      link: this.refs.link.value,
      mark: this.refs.mark.value
    }
    this.uploadImage(this.refs.myFile.files, newList, (obj) => {
      var day = this.state.addingDay
      var timeline = this.state.trip.timeline
      if(timeline[day-1].travel === undefined) {
        timeline[day-1].travel = []
      }
      timeline[day-1].travel.push(obj)
      this.setState({trip: this.state.trip})
      this.refs.name.value = ""
      this.refs.detail.value = ""
      this.refs.link.value = ""
      this.refs.mark.value = ""
      this.props.onUpdateTrip(this.state.trip, this.props.routeParams.tripKey)
      this.close()
    })

  }

  updateTravel(e) {
    var updateList = {name: e.name, time: e.time, detail: e.detail, link: e.link, mark: e.mark}
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
      <div>
        <TripInfo tripInfo={this.state.trip} />
        <Col className="left_box" md={4}>
          <br />TRIP TRIP TRIP<br />
        </Col>
        <Col className="right_box" md={8}>
          {
            this.state.trip.timeline !== undefined ?
            this.state.trip.timeline.map(input =>
              <div className="tl_day_box" key={input.day}>
                <Panel className="tl_day" header={
                  <div>Day {input.day}
                    <span onClick={this.removeDay.bind(this, input.day)}>
                      <Glyphicon className="remove" glyph="remove" />
                    </span>
                    <span>
                      <Glyphicon className="remove" glyph="chevron-up" />
                    </span>
                    <span>
                      <Glyphicon className="remove" glyph="chevron-down" />
                    </span>
                  </div>
                }>
                {
                  this.state.trip.timeline[parseInt(input.day)-1].travel !== undefined ?
                  this.state.trip.timeline[parseInt(input.day)-1].travel
                    .sort( (i,j) => { return i.time > j.time})
                    .map((item,index) =>
                      <div className="tl_event_box"  key={input.day+item.name}>
                        <h4>
                          <b>{item.time}</b>
                          <Edit {...{item: item, day: input.day, index: index, callBack: this.updateTravel}} />
                          <span onClick={this.removeTravel.bind(this, input.day, index)}>
                            <Glyphicon className="remove" glyph="remove" />
                          </span>
                        </h4>
                        <h4>{item.name}</h4>
                        {
                          item.image !== undefined ?
                          <img className="tl_pic" role="presentation" src={item.image[0]}/> : ""
                        }
                        <h5>{item.detail}</h5>
                        <a href={item.link}>{item.link}</a>
                        <h5>{item.mark}</h5>
                      </div>
                  ) : ""
                }

                <div>
                  <div className="add_event">
                    <Button className="add_event_btn" onClick={ () => this.open(input.day)} > NEW EVENT </Button>
                  </div>
                  <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                      <Modal.Title>ADD EVENT TO DAY {input.day} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form className="add_event_form">
                        <div className="time">
                          <label>Time </label>
                          <select ref="hour" placeholder="select time">
                            <option value="00">00</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                          </select> :
                          <select ref="minute" placeholder="select time">
                            <option value="00">00</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                          </select>
                        </div>
                        <label>Name </label><input placeholder="name" ref="name" /><br />
                        <label>Comment</label><br />
                        <textarea ref="detail" rows="5"></textarea><br />
                        <label>Link </label><input placeholder="link" ref="link" /><br />
                        <label>Mark </label><input placeholder="mark" ref="mark" /><br />
                        <label>Select a picture to upload </label>
                        <input type="file" multiple="multiple" ref="myFile" size="50" />
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={this.addTravel}>Add</Button>
                      <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
                </Panel>
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
