const initialState = {
  allTrips: {},
  myTrips: {},
  isListenAllTrips: false,
  isListenMyTrips: false
}

const trips = (state = initialState, action) => {
  switch(action.type) {
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
    default:
      return state
  }
}
export default trips
