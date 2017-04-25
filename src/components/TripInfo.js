import React, { Component } from 'react';
import '../css/Timeline.css';
import { Button, Modal, Glyphicon } from 'react-bootstrap'

class TripInfo extends Component {

  constructor(props){
    super(props)
    this.state = {
      showModal: false
    };
		this.close = this.close.bind(this)
		this.open = this.open.bind(this)
		this.save = this.save.bind(this)
  }

  save() {
		this.props.callBack({
			name : this.refs.name.value,
			detail : this.refs.detail.value,
		})
		this.close()
  }

  close() { this.setState({ showModal: false }) }
  open() { this.setState({ showModal: true }) }

  render() {
    return (
			<div className="tl_header">
				<div className="tl_info">
					<h1 className="tl_name">{this.props.tripInfo.name}</h1>
					<h4 className="tl_detail">{this.props.tripInfo.detail}</h4>
					<span onClick={this.open} >
	          <span className="info_edit"><Glyphicon glyph="edit" /> แก้ไข </span>
	        </span>
					<Modal show={this.state.showModal} onHide={this.close}>
	          <Modal.Header closeButton>
	            <Modal.Title>Edit Trip Info</Modal.Title>
	          </Modal.Header>
	          <Modal.Body>
	            <form>
	              <label>Name</label><input ref="name" defaultValue={this.props.tripInfo.name} /><br />
	              <label>Detail</label>
	              <textarea ref="detail" defaultValue={this.props.tripInfo.detail} rows="5"></textarea><br />
	            </form>
	          </Modal.Body>
	          <Modal.Footer>
	            <Button onClick={this.save}>Save</Button>
	            <Button onClick={this.close}>Close</Button>
	          </Modal.Footer>
	        </Modal>
				</div>
			</div>
		)
	}
}

export default TripInfo
