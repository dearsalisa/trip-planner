import * as firebase from 'firebase'

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
