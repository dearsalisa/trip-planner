import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap'
import '../css/Header.css'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { fbSignOut } from '../actions/authAction'

class Header extends Component {
	render(){
		const { onSignOutClick} = this.props;
	  return(
		  <Navbar inverse collapseOnSelect className="header">
		    <Navbar.Header>
		      <Navbar.Brand>
		        <Link to='/home'>
              <img height={55} role="presentation" src={require('../images/logo2.png')}/>
            </Link>
		      </Navbar.Brand>
		      <Navbar.Toggle />
		    </Navbar.Header>
		    <Navbar.Collapse>
		      <Nav>
		        <NavItem eventKey={1} href="#">All Trips</NavItem>
		        <NavItem eventKey={2} href="#">Articles</NavItem>
		      </Nav>
		      <Nav pullRight>
		        <LinkContainer to='/profile'>
		          <NavItem eventKey={1} >{this.props.user.displayName}</NavItem>
		        </LinkContainer>
		        <NavItem eventKey={2} onClick={ onSignOutClick }>Logout</NavItem>
		      </Nav>
		    </Navbar.Collapse>
		  </Navbar>
	)}
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
	onSignOutClick(values) {
		dispatch(fbSignOut())
	}
})

Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default Header
