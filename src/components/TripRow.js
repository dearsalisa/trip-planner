import React, { Component } from 'react'
import '../css/Profile.css';
import { Col, Thumbnail } from 'react-bootstrap'
import { Link } from 'react-router'

class TripRow extends Component {

  render() {
    var trips = this.props.trips
    var allUsers = this.props.allUsers
    if(trips.length === undefined) {
      trips = Object.keys(trips).map( (key) => {
        trips[key].key = key
        return trips[key]
      })
    }
    if(trips.length === 0) return (<div> </div>)
    return (
      <div>
      {
        trips.map( (trip) => {
              var owner = allUsers[trip.owner]
              return (
              <div key={trip.key}>
                <Col xs={4} md={3}>
                  <Thumbnail className="box" src={require('../images/home03.jpg')} alt="242x200">
                    <Link className="link_trip" to={`/${trip.key}/view`}>
                      <h4><b>{trip.name}</b></h4>
                    </Link>
                    <p className="username">{trip.displayName}</p>
                    <p className="text">{trip.detail}</p>
                  </Thumbnail>
                </Col>
              </div>
            )
        })
      }
      </div>
    )
  }

}

export default TripRow
