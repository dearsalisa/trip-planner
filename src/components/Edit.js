import React, { Component } from 'react';
import { Popover, Tooltip, Button, Modal, OverlayTrigger } from 'react-bootstrap'
import '../css/Timeline.css'

const Edit = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {
    return (
      <div className="edit">
        <a onClick={this.open} >edit</a>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="timeline_form">
              <div className="time" >
                <label>Time</label>
                <select  ref="time" placeholder="select time">
                  <option value="9:00">9:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                </select>
              </div>
              <input placeholder="name" ref="name" />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

export default Edit