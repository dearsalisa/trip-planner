import React, { Component } from 'react'
import '../css/Profile.css'
import * as firebase from 'firebase'
import UserInfo from '../components/UserInfo'
import { Button } from 'react-bootstrap'

class Profile extends Component {

  render() {
    return (
      <div>
        <UserInfo />
      </div>
    )
  }

}

export default Profile
