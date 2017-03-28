const initialState = {
    isUserSignedIn: false,
    isInProgress: false,
    hasError: false,
    errorMessage: '',
    uid: 0
};

const auth = (state = initialState, action) => {
  console.log("auth:" + action.type)
  switch (action.type) {
    case "CHECKING_LOGIN_STATUS":
      if(state.isUserSignedIn) {
        return {...state}
      }
      return {
        ...state,
        isInProgress: true
      }
    case "LOGINED":
      return {
        ...state,
        uid: action.user.uid,
        isInProgress: false,
        isUserSignedIn: true
      }
    case "NOT_LOGIN":
      return {
        ...state,
        isInProgress: false,
        isUserSignedIn: false
      }
    case "LOGIN_USER_SUCCESS":
    return {
      ...state,
      isUserSignedIn: true
    }
    default:
      return {...state}
  }
}

export default auth
