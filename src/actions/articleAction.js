import firebase from 'firebase'
// import { push } from 'react-router-redux'

export const getArticle = () => {
	return (dispatch) => {
    firebase.database().ref(`article`).once("value").then( (snapshot) => {
      // console.log(snapshot.val())
      dispatch({ type: "GET_ARTICLE_SUCCESS", allArt: snapshot.val() })
    })
	}
}
