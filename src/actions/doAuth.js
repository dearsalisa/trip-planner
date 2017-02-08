import firebase from 'firebase'
import { push } from 'react-router-redux'

export const doAuth = ({ email, password }) => {
	console.log(email,password);
	return (dispatch) => {
	startLoginUser(dispatch)
	firebase.auth().signInWithEmailAndPassword(email, password)
		.then((user) => {
			loginUserSuccess(dispatch, user)
			dispatch(push(`/home`))
		})
		.catch(() => {
			firebase.auth().createUserWithEmailAndPassword(email, password)
				.then((user) => loginUserSuccess(dispatch, user))
				.catch(() => loginUserFail(dispatch))
		})
	}
}

const startLoginUser = (dispatch) => {
	dispatch({ type: "LOGIN_USER" })
}

const loginUserSuccess = (dispatch, user) => {
	console.log("LOGIN SUCCESS")
	dispatch({ type: "LOGIN_USER_SUCCESS", payload: user })
}

const loginUserFail = (dispatch) => {
	dispatch({ type: "LOGIN_USER_FAIL" })
}
