import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Tripview.css'
import TripInfo from '../components/TripInfo'
import { Button, Glyphicon, Col } from 'react-bootstrap'
import { likeTrip, unLikeTrip } from '../actions/tripAction'

class Tripview extends Component {

  constructor(props) {
    super(props);
    var trip = props.tripInfo.allTrips[props.routeParams.tripKey]
    this.state = {
      trip: trip == undefined ? {} : trip
    }
    this.likeAction = this.likeAction.bind(this)
    this.isLike = this.isLike.bind(this)
  }

  componentWillReceiveProps(newProps) {
      var trip = newProps.tripInfo.allTrips[this.props.routeParams.tripKey]
      this.setState({ trip: trip })
  }

  isLike() {
    var trip = this.state.trip.like
    if(trip === undefined) return false
    var likes = Object.keys(trip).map( (key) => {
      return trip[key]
    })
    return likes.length > 0
  }

  likeAction() {
      var key = this.props.routeParams.tripKey

      if(this.isLike()) {
        this.props.onUnLikeTrip(key, this.props.user.uid)
      } else {
        this.props.onLikeTrip(key, this.props.user.uid)
      }
  }

  render() {
    return (
      <center className="bg">
        <div className="page">
          <TripInfo tripInfo={this.state.trip} />

            <Button className="view_btn" bsSize="large" onClick={ () => this.likeAction() } >
              <Glyphicon className="heart-empty" glyph="heart-empty" /> LIKE
            </Button>
            <Button className="view_btn" bsSize="large" >
              <Glyphicon className="duplicate" glyph="duplicate" /> DUPLICATE
            </Button>
            <Button className="view_btn" bsSize="large" >
              <Glyphicon className="share" glyph="share-alt" /> SHARE
            </Button>

            <Col className="left_box" md={4}>TRIP</Col>
            <Col className="right_box" md={8}>
              {
                this.state.trip.timeline !== undefined ?
                this.state.trip.timeline.map(input =>
                  <div key={input.day}>
                    <h3 className="day" >Day {input.day}</h3>
                    {
                      this.state.trip.timeline[parseInt(input.day)-1].travel !== undefined ?
                      this.state.trip.timeline[parseInt(input.day)-1].travel
                        .sort( (i,j) => { return i.time > j.time})
                        .map((item,index) =>
                          <div className="event_form" key={input.day+item.name}>
                            <h4><b>{item.time}</b></h4>
                            <h4>{item.name}</h4>
                            <img className="pic" role="presentation" src={require('../images/home01.jpg')}/>
                            <h5>{item.detail}</h5>
                          </div>
                      ) : <div className="event_form"><h5>no event</h5></div>
                    }
                  </div>
                ) : ""
              }
            </Col>
        </div>
      </center>
    )
  }
}

const mapStateToProps = (state) => ({
    tripInfo: state.trips,
    user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
  onLikeTrip(trip_id, user_id) {
    dispatch(likeTrip({trip_id: trip_id, user_id: user_id}))
  },
  onUnLikeTrip(trip_id, user_id) {
    dispatch(unLikeTrip({trip_id: trip_id, user_id: user_id}))
  }
})

Tripview = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tripview)

export default Tripview
