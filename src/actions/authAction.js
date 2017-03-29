import * as firebase from 'firebase'
import { push } from 'react-router-redux'

export function isLogin() {
  return (dispatch) => {
    return new Promise(function(resolve, reject){
      dispatch({type:"CHECKING_LOGIN_STATUS"});
      firebase.auth().onAuthStateChanged((user) => {
    		if (user) {
          dispatch({type:"LOGINED",user: user.providerData[0]})
          resolve()
    		} else {
    			dispatch({type:"NOT_LOGIN"})
          reject("NOT_LOGIN")
    		}
    	})
    })
  }
}

export function fbSignIn() {
    return (dispatch) => {
      dispatch({type:"LOGIN_IN_PROGRESS"})

      const provider = new firebase.auth.FacebookAuthProvider();

      firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const { user: { uid, displayName, photoURL, email } } = result;

        firebase.database().ref(`users/${ uid }`).set({
          displayName,
          photoURL,
          email,
          lastTimeLoggedIn: firebase.database.ServerValue.TIMESTAMP
        });

        console.log(result)
        dispatch({type: "LOGIN_USER_SUCCESS",user: result.user.providerData[0]});
        dispatch(push("/home"))
      })
      .catch((error) => {
        dispatch({type: "LOGIN_USER_FAIL"})
      });
    }
}

export function fbSignOut() {
    return (dispatch) => {
      //dispatch({type:"LOGIN_OUT_PROGRESS"})

      firebase.auth().signOut()
      .then(() => {
        //dispatch({type: "LOGOUT_USER_SUCCESS"});
        dispatch(push("/login"))
      })
      .catch((error) => {
        //dispatch({type: "LOGOUT_USER_FAIL"})
      });
    }
}