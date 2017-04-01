import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Tripview.css'
//import { Button, Glyphicon, Tabs, Tab, Panel } from 'react-bootstrap'

class Tripview extends Component {

  componentWillMount(){
  }

  render() {
    return (
      <center className="bg">
        <div className="page">
          <div className="trip_header">
            <h2></h2>
            <h4></h4>
          </div>
        </div>
      </center>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

Tripview = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tripview)

export default Tripview
