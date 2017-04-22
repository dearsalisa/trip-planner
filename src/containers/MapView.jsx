import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from 'react-pure-render/function';
import '../css/MapView.css'
import { loadLocation } from '../actions/mapAction'

import GoogleMap from 'google-map-react';

class MapView extends Component {
  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    greatPlaceCoords: PropTypes.any
  };

  static defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9,
    greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    props.onLoadLocation("ขอนแก่นวิทยายน")
  }

  render() {
    console.log("RENDER")
    return (
      <div className="map">
         <GoogleMap
          bootstrapURLKeys={{key: "AIzaSyC8kZ_UDgZx-oN1YbFTotUayZrSmbIrpBA"}}
          center={this.props.center}
          zoom={this.props.zoom}>
        </GoogleMap>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tripInfo: state.trips
})

const mapDispatchToProps = (dispatch) => ({
  onLoadLocation(name) {
    dispatch(loadLocation({name: name}))
  }
})

MapView = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapView)

export default MapView
