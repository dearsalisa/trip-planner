import React, { Component } from 'react';
import { Button, Modal, Glyphicon } from 'react-bootstrap'
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
    var event_time = this.refs.hour.value+":"+this.refs.minute.value
    this.props.callBack({
      time : event_time,
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
        <span onClick={this.open} >
          <Glyphicon className="glyph_edit" glyph="edit" />
        </span>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="time" >
                <label>Time</label>
                <select ref="hour" placeholder="select time" defaultValue={this.props.item.time.substring(0, 2)}>
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
                </select> :
                <select ref="minute" placeholder="select time" defaultValue={this.props.item.time.substring(3, 5)}>
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </select>
              </div>
              <label>Name</label>
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
