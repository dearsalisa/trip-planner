import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../css/Tripview.css';
import { Button, Glyphicon } from 'react-bootstrap'
import { likeTrip, unLikeTrip } from '../actions/tripAction'

class TripViewInfo extends Component {

	constructor(props) {
		super(props);

		this.likeAction = this.likeAction.bind(this)
		this.isLike = this.isLike.bind(this)
	}

	isLike() {
    var trip = this.props.trip.like
    if(trip === undefined) return false
    var likes = Object.keys(trip).map( (key) => {
      return trip[key]
    })
    return likes.length > 0
  }

  likeAction() {
      var key = this.props.trip_id
      if(this.isLike()) {
        this.props.onUnLikeTrip(key, this.props.user.uid)
      } else {
        this.props.onLikeTrip(key, this.props.user.uid)
      }
  }

	render() {
		return (
			<div className="trip_header">
				<center className="trip_detail">
						<h2>{this.props.trip.name}</h2>
						<h4>{this.props.trip.detail}</h4>
					<Button className="view_btn" bsSize="large" onClick={() => this.likeAction()}>
						<Glyphicon className="heart-empty" glyph="heart-empty" /> LIKE
					</Button>
					<Button className="view_btn" bsSize="large" >
						<Glyphicon className="duplicate" glyph="duplicate" /> DUPLICATE
					</Button>
					<Button className="view_btn" bsSize="large" >
						<Glyphicon className="share" glyph="share-alt" /> SHARE
					</Button>
				</center>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
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

TripViewInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(TripViewInfo)

export default TripViewInfo
