const initialState = {
  allTrips: {},
  isListenAllTrips: false
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
    case "TRIPS_CHANGE":
      return {
        ...state,
        allTrips: action.trips
      }
    default:
      return state
  }
}
export default trips
