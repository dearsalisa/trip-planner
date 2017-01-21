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
		case 'LOGIN_USER':
			return {
				...state,
				get: {
					...state.get,
					isFinished: false,
					status: 'Loading'
				}
			}
		case 'LOGIN_USER_SUCCESS':
			//console.log(action.payload)
			return {
				...state,
				get: {
					...state.get,
					isFinished: true,
					status: 'Success',
					data: action.payload,
				}
			}
		case 'LOGIN_USER_FAIL':
			return {
				...state,
				get: {
					...state.get,
					isFinished: false,
					status: 'Error'
				}
			}
		// case 'POST_USER_SUCCESS':
		// 	data = [...state.get.data]
		// 	data.push(action.payload)
		// 	return {
		// 		...state,
		// 		get: {
		// 			...state.get,
		// 			data
		// 		}
		// 	}			
		// case 'DELETE_USER_SUCCESS':
		// 	data = [...state.get.data]
		// 	index = data.findIndex(value => value.id == action.payload.id)
		// 	data.splice(index,1)
		// 	return {
		// 		...state,
		// 		get: {
		// 			...state.get,
		// 			data
		// 		}
		// 	}
		// case 'PATCH_USER_SUCCESS':
		// 	data = [...state.get.data]
		// 	let index = data.findIndex(value => value.id == action.payload.id)
		// 	data[index] = action.payload
		// 	return {
		// 		...state,
		// 		get: {
		// 			...state.get,
		// 			data
		// 		}
		// 	}
		default:
			return state
	}
}