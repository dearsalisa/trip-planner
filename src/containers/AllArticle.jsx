import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Article.css'
import { Row, Col, Thumbnail, Grid, Button, FormGroup, FormControl } from 'react-bootstrap'
import { Link } from 'react-router'
import Footer from '../components/Footer'

class AllArticle extends Component {

	render() {
    var article = this.props.allArt
		if(article !== null) {
			var articleRow = Object.keys(article).map(function(key) {
				var eiei = article[key]
				if(eiei.name !== undefined){
					return(
						<div key={key}>
							<Col xs={4} md={4}>
								<img width={180} height={120} role="presentation" src={eiei.image}/>
								<Link className="link_trip" to={`/${key}/article`}>
									<h4><b>{eiei.name}</b></h4>
								</Link>
								<p>{eiei.text}</p>
							</Col>
						</div>
					)
				}
				return("")
			})
		}

		return (
			<center className="bg">
				<div>
					<h1 className="topic"><b> ARTICLES </b></h1>
          <Row>
            {articleRow}
          </Row>
          <Footer />
				</div>
			</center>
		)
	}
}

const mapStateToProps = (state) => ({
  allArt: state.article.allArt
})

const mapDispatchToProps = (dispatch) => ({

})

AllArticle = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllArticle)

export default AllArticle
