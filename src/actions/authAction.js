import * as firebase from 'firebase'
import { push } from 'react-router-redux'

export function isLogin() {
  return (dispatch) => {
    return new Promise(function(resolve, reject){
      dispatch({type:"CHECKING_LOGIN_STATUS"});
      firebase.auth().onAuthStateChanged((user) => {
    		if (user) {
          firebase.database().ref(`users/${ user.uid }`).once("value").then( (snapshot) => {
            var obj_user = snapshot.val()
            obj_user.uid = user.uid
            dispatch({type:"LOGINED",user: obj_user})
            resolve()
          })
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

        firebase.database().ref(`users/${ uid }`).once("value").then( (snapshot) => {
          if(!snapshot.hasChild("displayName")) {
            firebase.database().ref(`users/${ uid }`).set({
              displayName,
              photoURL,
              email,
              lastTimeLoggedIn: firebase.database.ServerValue.TIMESTAMP
            });
          }
          result.trip = snapshot.child('trips').val()
          result.like = snapshot.child("like").val()
          result.uid = uid
          dispatch({type: "LOGIN_USER_SUCCESS",user: result});
          dispatch(push("/home"))
        })
      })
      .catch((error) => {
        dispatch({type: "LOGIN_USER_FAIL"})
      });
    }
}

export function fbSignOut() {
    return (dispatch) => {
      dispatch({type:"LOGIN_OUT_PROGRESS"})

      firebase.auth().signOut()
      .then(() => {
        dispatch({type: "LOGOUT_USER_SUCCESS"});
        dispatch(push("/login"))
      })
      .catch((error) => {
        dispatch({type: "LOGOUT_USER_FAIL"})
      });
    }
}

export function getAllUser() {
  return (dispatch) => {
		dispatch({ type: "LOAD_ALL_USER"})
		firebase.database().ref('users').once("value").then( (dataSnapshot) => {
			dispatch({ type: "DONE_ALL_USER", users: dataSnapshot.val()})
		})
	}
}
