import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Article.css'
import { Row, Col, Thumbnail, Grid } from 'react-bootstrap'
import { Link } from 'react-router'

class Article extends Component {

	render() {

		return (
			<center className="bg">
				<div className="page">
          eiei
				</div>
			</center>
		)
	}
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

Article = connect(
  mapStateToProps,
  mapDispatchToProps
)(Article)

export default Article
