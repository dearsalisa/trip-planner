import React, { Component } from 'react'
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from 'react-pure-render/function';
import '../css/MapView.css'
import Marker from '../components/Marker'

import GoogleMap from 'google-map-react';

export default class MapView extends Component {
  static propTypes = {
    zoom: PropTypes.number,
  };

  static defaultProps = {
    zoom: 9,
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    var location = props.trip.timeline.map( (tl) => {
      if(tl.travel === undefined) return []
      return tl.travel.filter( (travel) => { return travel.location.lat !== undefined })
    })
    var center = location.map( (day) => {
      var local = day.filter( (sLocal) => { return sLocal.location.lat !== undefined })
      return [
        local.map( (l) => l.location.lat ).reduce((a, b) => a + b , 0) / local.length,
        local.map( (l) => l.location.lng ).reduce((a, b) => a + b, 0) / local.length
      ].map( (num) => {
        return isNaN(num)  ? 0 : num
      } )
    })
    console.log(center)
    this.state = {
      allCenter: center,
      center: center[0],
      travel: location,
      showingDay: 0
    }

    this.changeDay = this.changeDay.bind(this)
  }

  changeDay(index) {
    if(index != this.state.showingDay) {
        this.setState({ showingDay: index, center: this.state.allCenter[index] } )
    }
  }

  render() {
    return (
      <div>
        <div className="showday">
          {
            this.state.travel.map( (day,index) => <button key={index} className="day_btn" onClick={ () => this.changeDay(index) }> {index+1} </button>)
          }
        </div>
        <div className="map">
           <GoogleMap
            bootstrapURLKeys={{key: "AIzaSyC8kZ_UDgZx-oN1YbFTotUayZrSmbIrpBA"}}
            center={this.state.center}
            zoom={this.props.zoom}>
            {
              this.state.travel[this.state.showingDay].map( (travel) => <Marker key={travel.location.lat} lat={travel.location.lat} lng={travel.location.lng} text={travel.location.name} /> )
            }
          </GoogleMap>
        </div>
      </div>
    );
  }
}
