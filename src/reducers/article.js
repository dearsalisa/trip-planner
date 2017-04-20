const initialState = {
  allArt: {}
}

const trips = (state = initialState, action) => {
  switch(action.type) {
    case "GET_ARTICLE_SUCCESS":
      return {
        ...state,
        allArt: action.allArt
      }
    default:
      return state
  }
}
export default trips
