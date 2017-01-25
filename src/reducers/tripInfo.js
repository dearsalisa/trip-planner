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
		case 'ADD_TRIP':
			return {
				...state,
				get: {
					...state.get,
					isFinished: false,
					status: 'Loading'
				}
			}
		case 'ADD_TRIP_SUCCESS':
			console.log(action.payload)
			return {
				...state,
				get: {
					...state.get,
					isFinished: true,
					status: 'Success',
					data: action.payload,
				}
			}
		case 'ADD_TRIP_FAIL':
			return {
				...state,
				get: {
					...state.get,
					isFinished: false,
					status: 'Error'
				}
			}
		default:
			return state
	}
}