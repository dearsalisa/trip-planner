import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../css/Tripview.css';
import { Button, Glyphicon, Modal } from 'react-bootstrap'
import { duplicateTrip, likeTrip, unLikeTrip } from '../actions/tripAction'
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon,
} from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');

class TripViewInfo extends Component {

	constructor(props) {
		super(props);
		this.state = {
      showModal: false
    };
		this.close = this.close.bind(this)
		this.open = this.open.bind(this)
		this.likeAction = this.likeAction.bind(this)
		this.isLike = this.isLike.bind(this)
	}

	close() {
		this.setState({ showModal: false, addingDay: -1 });
	}

	open() {
		this.setState({ showModal: true });
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

	duplicateAction() {
		this.props.trip.id = this.props.trip_id
		this.props.onDuplicateTrip(this.props.trip, this.props.user.uid)
	}

	render() {

		const eiei = "http://localhost:3000"+this.props.tripUrl;
		const shareUrl = "http://www.flatuicolorpicker.com/";
    const title = this.props.trip.name;

		return (
			<div className="trip_header">
				<center className="trip_detail">
					<h2>{this.props.trip.name}</h2>
					<h4>{this.props.trip.detail}</h4>
					<Button className="view_btn" bsSize="large" onClick={() => this.likeAction()} >
						{
							(this.isLike())?  <div><Glyphicon className="heart" glyph="heart" /> LIKE</div>
						: <div><Glyphicon className="heart" glyph="heart-empty" /> LIKE</div>
						}
					</Button>
					<Button className="view_btn" bsSize="large" onClick={() => this.duplicateAction()} >
						<Glyphicon className="duplicate" glyph="duplicate" /> DUPLICATE
					</Button>
					<div className="Demo__container">
		        <div className="share_icon">
		          <FacebookShareButton
		            url={shareUrl}
		            title={title}
								picture={`${String(window.location)}`}
		            className="Demo__some-network__share-button">
		            <FacebookIcon
		              size={32}
		              round />
		          </FacebookShareButton>
						</div>
						<div className="share_icon">
		          <TwitterShareButton
		            url={shareUrl}
		            title={title}
		            className="Demo__some-network__share-button">
		            <TwitterIcon
		              size={32}
		              round />
		          </TwitterShareButton>
						</div>
						<div className="share_icon">
		          <GooglePlusShareButton
		            url={shareUrl}
		            className="Demo__some-network__share-button">
		            <GooglePlusIcon
		              size={32}
		              round />
		          </GooglePlusShareButton>
						</div>
					</div>
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
  },
	onDuplicateTrip(trip, user_id) {
		dispatch(duplicateTrip({trip: trip, user_id: user_id}))
	}
})

TripViewInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(TripViewInfo)

export default TripViewInfo
