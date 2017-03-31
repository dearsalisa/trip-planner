const initialState = {
    isUserSignedIn: false,
    isInProgress: false,
    hasError: false,
    errorMessage: '',
    user: {}
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
        user: action.user,
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
        user: action.user,
        isInProgress: false,
        isUserSignedIn: true
      }
    case "LOGIN_IN_PROGRESS":
      return {
        ...state,
        isInProgress: true
      }
    case "LOGIN_USER_FAIL":
      return {
        ...state,
        isInProgress: false,
      }
    case "LOGOUT_USER_SUCCESS":
      return {
        ...state,
        isUserSignedIn: false
      }
    default:
      return {...state}
  }
}

export default auth
