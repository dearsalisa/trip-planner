import React from 'react';
import '../css/Profile.css';
import { Link } from 'react-router'
import { Row, Col, Grid } from 'react-bootstrap'

const Footer = () => {
	return (
    <div className="footer">
      <Grid>
        <Row>
          <Col xs={4} md={4}>
            <p>description</p>
            <p>description</p>
            <p>description</p>
            <p>description</p>
            <p>description</p>
          </Col>
          <Col xs={4} md={4}>
            <p>description</p>
            <p>description</p>
            <p>description</p>
            <p>description</p>
            <p>description</p>
          </Col>
          <Col xs={4} md={4}>
            <p>description</p>
            <p>description</p>
            <p>description</p>
            <p>description</p>
            <p>description</p>
          </Col>
        </Row>
      </Grid>
    </div>
	)
}

export default Footer
