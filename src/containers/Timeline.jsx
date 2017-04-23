import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Timeline.css'
import { Button, Col, Modal, Glyphicon, Panel } from 'react-bootstrap'
import TripInfo from '../components/TripInfo'
import Edit from '../components/Edit'
import { updateTrip } from '../actions/tripAction'
import { uploadImage } from '../actions/firebaseAction'
import { loadLocation } from '../actions/mapAction'
import { Link } from 'react-router'
import MapView from './MapView'

class Timeline extends Component {

  constructor(props) {
    super(props);
    var trip = props.tripInfo.allTrips[props.routeParams.tripKey]
    this.state = {
      showModal: false,
      addingDay: -1,
      trip: trip === undefined ? {} : trip,
      value: "00:00",
      isShowMap: false
    };
    this.updateTravel = this.updateTravel.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.addTravel = this.addTravel.bind(this)
    this.updateTripInfo = this.updateTripInfo.bind(this)
    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
    this.moveDay = this.moveDay.bind(this)
  }

  close() { this.setState({ showModal: false, addingDay: -1 }); }
  open(day) { this.setState({ showModal: true, addingDay: day }); }

  componentWillReceiveProps(newProps) {
      var trip = newProps.tripInfo.allTrips[this.props.routeParams.tripKey]
      this.setState({ trip: trip })
  }

  updateTripInfo(e) {
    var trip = this.state.trip
    trip.name = e.name
    trip.detail = e.detail
    this.props.onUpdateTrip(this.state.trip, this.props.routeParams.tripKey)
    this.close()
  }

  addDay() {
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
      if(images.length == 0) {
        after(obj)
        return
      }
      console.log(obj.image)
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
      mark: this.refs.mark.value,
      location: {
        name: this.refs.location.value,
        isLoaded: this.refs.location.value === undefined ? undefined : false
      }
    }
    this.uploadImage(this.refs.myFile.files, newList, (obj) => {
      var day = this.state.addingDay
      var timeline = this.state.trip.timeline
      if(timeline[day-1].travel === undefined) {
        timeline[day-1].travel = []
      }
      console.log(obj.location.name.length)
      if(obj.location.name !== undefined && obj.location.name.length !== 0) {
        this.props.onLoadLocation(obj.location.name).then( (location) => {
          obj.location.isLoaded = true
          obj.location.lat = location.lat
          obj.location.lng = location.lng
          timeline[day-1].travel.push(obj)
          this.setState({trip: this.state.trip})
          this.refs.name.value = ""
          this.refs.detail.value = ""
          this.refs.link.value = ""
          this.refs.mark.value = ""
          this.refs.location.vale = ""
          this.props.onUpdateTrip(this.state.trip, this.props.routeParams.tripKey)
          this.close()
        })
      } else {
        timeline[day-1].travel.push(obj)
        this.setState({trip: this.state.trip})
        this.refs.name.value = ""
        this.refs.detail.value = ""
        this.refs.link.value = ""
        this.refs.mark.value = ""
        this.refs.location.vale = ""
        this.props.onUpdateTrip(this.state.trip, this.props.routeParams.tripKey)
        this.close()
      }
    })
  }

  updateTravel(e) {
    var updateList = {name: e.name, time: e.time, detail: e.detail, link: e.link, mark: e.mark, location: e.location}
    this.uploadImage(e.image, updateList, (obj) => {
      var image = this.state.trip.timeline[e.day-1].travel[e.index].image

      if(image !== undefined && obj.image !== undefined) {
        obj.image = image.concat(obj.image)
      } else if (image === undefined && obj.image !== undefined) {
        obj.image = obj.image
      } else if (image !== undefined && obj.image === undefined) {
        obj.image = image
      }

      var location = this.state.trip.timeline[e.day-1].travel[e.index].location
      if(obj.location.name !== location.name && obj.location.name !== undefined) {
        this.props.onLoadLocation(obj.location).then( (newLocation) => {
          console.log(newLocation)
          obj.location = {
            isLoaded: true,
            lat: newLocation.lat,
            lng: newLocation.lng,
            name: obj.location
          }
          this.state.trip.timeline[e.day-1].travel[e.index] = obj
          this.props.onUpdateTrip(this.state.trip, this.props.routeParams.tripKey)
        })
      } else {
        obj.location = location
        this.state.trip.timeline[e.day-1].travel[e.index] = obj
        this.props.onUpdateTrip(this.state.trip, this.props.routeParams.tripKey)
      }
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

  moveDay(isUp, day) {
    if(isUp && day === 1) return
    if(!isUp && day === this.state.trip.timeline.length) return
    var tmp = this.state.trip.timeline[day-1]
    if(isUp) {
      this.state.trip.timeline[day-1] = this.state.trip.timeline[day-2]
      this.state.trip.timeline[day-1].day = day
      this.state.trip.timeline[day-2] = tmp
      this.state.trip.timeline[day-2].day = day-1
    } else {
      this.state.trip.timeline[day-1] = this.state.trip.timeline[day]
      this.state.trip.timeline[day-1].day = day
      this.state.trip.timeline[day] = tmp
      this.state.trip.timeline[day].day = day+1
    }
    this.props.onUpdateTrip(this.state.trip, this.props.routeParams.tripKey)
  }

  render() {
    return (
      <center className="bg">
      <div>
        <TripInfo {...{tripInfo: this.state.trip, callBack: this.updateTripInfo}} />

        <div className="timeline">
          <div className="map_box">
            <Button className="map_view" bsSize="large" active onClick={ () => {this.setState({isShowMap: !this.state.isShowMap })} }>
              { this.state.isShowMap ? "TIMELINE VIEW" : "MAP VIEW"}
            </Button>
          </div>
          {
            this.state.isShowMap ? <MapView {...this.state} /> :
            this.state.trip.timeline !== undefined ?
            this.state.trip.timeline.map(input =>
              <div className="tl_day_box" key={input.day}>
                <Panel header={
                  <div> Day {input.day}
                    <div className="tl_reorder">
                      <span>
                        <Glyphicon className="remove" glyph="chevron-up" onClick={() => this.moveDay(true, input.day)} />
                      </span>
                      <span>
                        <Glyphicon className="remove" glyph="chevron-down" onClick={() => this.moveDay(false, input.day)} />
                      </span>
                      <span onClick={this.removeDay.bind(this, input.day)}>
                        <Glyphicon className="remove" glyph="remove" />
                      </span>
                    </div>
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
                          <b className="event_name">{item.name}</b>
                        </h4>
                        <h4 className="edit_set">
                          <Edit {...{item: item, day: input.day, index: index, callBack: this.updateTravel}} />
                          <span onClick={this.removeTravel.bind(this, input.day, index)}>
                            <Glyphicon className="remove" glyph="remove" />
                          </span>
                        </h4>
                        <h5>{item.location.name !== undefined ? "Location : "+item.location.name : ""}</h5>
                        {
                          item.image !== undefined ?
                          item.image.map((image, index) =>
                            <img key={index} className="tl_pic" role="presentation" src={image}/>
                          ) : ""
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
                        <label>Location </label><input placeholder="location" ref="location" /><br />
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
            { this.state.isShowMap ? "" : <Button className="add_day" onClick={ () => this.addDay() }>ADD DAY</Button> }
          </center>
        </div>
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
  },

  onLoadLocation(name) {
    return dispatch(loadLocation({name: name}))
  }
})

Timeline = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline)

export default Timeline
