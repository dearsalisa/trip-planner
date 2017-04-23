import React, { Component } from 'react'
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from 'react-pure-render/function';
import '../css/Timeline.css'

const K_WIDTH = 50;
const K_HEIGHT = 50;

export default class Marker extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
       <div>
        <img className="markmap" role="presentation" src={require('../images/mark.png')}/>
        <p className="location">{this.props.text}</p>
       </div>
    );
  }
}
