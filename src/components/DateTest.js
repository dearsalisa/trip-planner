import React from 'react';
import ReactDOM from 'react-dom';
import Grid from "react-bootstrap/lib/Grid";
import DatePicker from 'react-bootstrap-date-picker';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

const DateTest = React.createClass({
  getInitialState() {
    return {
      date: new Date().toISOString(),
      previousDate: null,
      focused: false
    };
  },
  handleChange(value) {
    this.setState({
      date: value
    });
  },
  render() {
    const LabelISOString = new Date().toISOString();
    return (
      <div>
          <FormGroup controlId="change_handler">
            <ControlLabel>STARE DATE</ControlLabel>
            <DatePicker placeholder="STARE DATE" value={this.state.date} id="change_handler_example" />
            <ControlLabel>END DATE</ControlLabel>
            <DatePicker placeholder="END DATE" value={this.state.date} id="change_handler_example" />
          </FormGroup>
        </div>
    )
  }
});

export default DateTest