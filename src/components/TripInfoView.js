import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../css/Tripview.css';
import { Button, Glyphicon, Modal } from 'react-bootstrap'
import { duplicateTrip, likeTrip, unLikeTrip } from '../actions/tripAction'

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
		return (
			<div className="trip_header">
				<center className="trip_detail">
					<h2>{this.props.trip.name}</h2>
					<h4>{this.props.trip.detail}</h4>
					<Button className="view_btn" bsSize="large" onClick={() => this.likeAction()} active>
						{
							(this.isLike())?  <div><Glyphicon className="heart" glyph="heart" /> LIKE</div>
						: <div><Glyphicon className="heart" glyph="heart-empty" /> LIKE</div>
						}
					</Button>
<<<<<<< HEAD
					<Button className="view_btn" bsSize="large" onClick={ () => this.open()} active>
=======
					<Button className="view_btn" bsSize="large" onClick={() => this.duplicateAction()} >
>>>>>>> Done duplicate trip
						<Glyphicon className="duplicate" glyph="duplicate" /> DUPLICATE
					</Button>
					<Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>DUPLICATE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>keep it to my store ?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button>OK</Button>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
					<Button className="view_btn" bsSize="large" active>
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
