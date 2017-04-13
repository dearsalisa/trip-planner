import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap'
import '../css/Timeline.css'

class Edit extends Component {

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
      time : this.refs.time.value,
      name : this.refs.name.value,
      detail : this.refs.detail.value,
      image : this.refs.myFile.files[0],
      index : this.props.index,
      day : this.props.day
    })
    this.close()
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    //console.log(this.props)
    return (
      <div className="edit">
        <a onClick={this.open} >edit</a>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="time" >
                <label>Time</label>
                <select  ref="time" placeholder="select time" defaultValue={this.props.item.time}>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                </select>
              </div>
              <label>Name</label><br />
              <input placeholder="name" ref="name" defaultValue={this.props.item.name} /><br />
              <label>Comment</label><br />
              <textarea ref="detail" defaultValue={this.props.item.detail} rows="5"></textarea><br />
              <label>Select a file to upload </label>
              <input type="file" ref="myFile" size="50" />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.save}>Save</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Edit
