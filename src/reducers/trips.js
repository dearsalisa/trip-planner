const initialState = {
  allTrips: {}
}

const trips = (state = initialState, action) => {
  switch(action.type) {
    case "ADD_TRIP_SUCCESS":
      state.allTrips[action.newTrip.key] = action.newTrip
      return state
    default:
      return state
  }
}
export default trips
