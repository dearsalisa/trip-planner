const initialState = {
  allTrips: {},
  myTrips: {},
  likeTrips: {},
  isListenAllTrips: false,
  isListenMyTrips: false
}

const trips = (state = initialState, action) => {
  switch(action.type) {
    case "LOGINED":
      return {
        ...state,
        likeTrips: action.user.like
      }
    case "ADD_TRIP_SUCCESS":
      return state
    case "LISTEN_ALL_TRIPS":
      return {
        ...state,
        isListenAllTrips: true
      }
    case "LISTEN_MY_TRIPS":
      return {
        ...state,
        isListenMyTrips: true
      }
    case "MY_TRIPS_CHANGE":
      return {
        ...state,
        myTrips: action.trips
      }
    case "TRIPS_CHANGE":
      return {
        ...state,
        allTrips: action.trips
      }
    case "UPDATE_TRIP_SUCCESS":
      return state
    case "LIKE_TRIP_SUCCESS":
      var likeTrips = state.likeTrips
      likeTrips[action.key] = action.trip_id
      return {
        ...state,
        likeTrips: likeTrips
      }
    case "UNLIKE_TRIP_SUCCESS":
      var likeTrips = state.likeTrips
      delete likeTrips[action.key]
      return {
        ...state,
        likeTrips: likeTrips
      }
    default:
      return state
  }
}
export default trips
