import React, { Component } from 'react'
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from 'react-pure-render/function';

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
       <div style={
          {
          position: 'absolute',
          width: K_WIDTH,
          height: K_HEIGHT,
          left: -K_WIDTH / 2,
          top: -K_HEIGHT / 2,

          border: '5px solid #f44336',
          borderRadius: K_HEIGHT,
          backgroundColor: 'white',
          textAlign: 'center',
          color: '#3f51b5',
          fontSize: 16,
          fontWeight: 'bold',
          padding: 4
        }
       }>
          {this.props.text}
       </div>
    );
  }
}
