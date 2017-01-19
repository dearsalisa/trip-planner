import firebase from 'firebase'

export const loginUser = ({ email, password }) => {
	console.log(email,password);
	return (dispatch) => {
		startLoginUser(dispatch)
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => loginUserSuccess(dispatch, user))
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
	dispatch({ type: "LOGIN_USER_SUCCESS", payload: user })
}

const loginUserFail = (dispatch) => {
	dispatch({ type: "LOGIN_USER_FAIL" })
}