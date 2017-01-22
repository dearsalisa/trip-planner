import React from 'react'
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

const Header = () => {

  return(
  <Navbar inverse collapseOnSelect>
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
          <NavItem eventKey={1} >dearsalisa</NavItem>
        </LinkContainer>
        <NavItem eventKey={2} href="#">Logout</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)}

export default Header