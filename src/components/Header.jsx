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
		        <Link to='/home'>Trip Planner</Link>
		      </Navbar.Brand>
		      <Navbar.Toggle />
		    </Navbar.Header>
		    <Navbar.Collapse>
		      <Nav>
		        <NavItem eventKey={1} href="#">Link</NavItem>
		        <NavItem eventKey={2} href="#">Link</NavItem>
		        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
		          <MenuItem eventKey={3.1}>Action</MenuItem>
		          <MenuItem eventKey={3.2}>Another action</MenuItem>
		          <MenuItem eventKey={3.3}>Something else here</MenuItem>
		          <MenuItem divider />
		          <MenuItem eventKey={3.3}>Separated link</MenuItem>
		        </NavDropdown>
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
