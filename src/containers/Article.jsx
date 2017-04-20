import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Article.css'
import { Row, Col, Thumbnail, Grid } from 'react-bootstrap'
import { Link } from 'react-router'

class Article extends Component {
	render() {
    var articleKey = this.props.params.articleKey
    console.log(this.props.allArt[articleKey])
    if(this.props.allArt[articleKey] === undefined){
      return (<h1></h1>)
    } else
      var code = this.props.allArt[articleKey].detail
      return (
        <div className="bg">
          <div className="art_content">
            <div dangerouslySetInnerHTML={{__html: code}} />
          </div>
        </div>
  		)
    }

}


const mapStateToProps = (state) => ({
  allArt: state.article.allArt
})

const mapDispatchToProps = (dispatch) => ({

})

Article = connect(
  mapStateToProps,
  mapDispatchToProps
)(Article)

export default Article
