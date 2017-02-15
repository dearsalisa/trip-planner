import * as doAuth from '../actions'
import * as addTrip from '../actions'
import * as getTrips from '../actions'
import * as getTripbyId from '../actions'

export default {
	...doAuth,
	...addTrip,
	...getTrips,
	...getTripbyId
}
