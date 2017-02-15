const initialState = {
	get: {
		isFinished: false,
		status: '',
		data: [],
	},
	delete: {
		isDeleted: false,
		status: '',
		data: {}
	}
}

export default (state = initialState, action) => {
	let data, index
	switch(action.type) {
		case 'GET_TRIP_BY_ID_SUCCESS':
		//console.log(action.payload)
			return {
				...state,
				get: {
					...state.get,
					isFinished: true,
					status: 'Success',
					data: action.payload
				}
			}
		default:
			return state
	}
}