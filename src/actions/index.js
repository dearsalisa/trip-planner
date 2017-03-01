import * as doAuth from '../actions'
import * as addTrip from '../actions'
import * as getTrips from '../actions'
import * as getTripbyId from '../actions'
import * as addTimeline from '../actions'
import * as getTimeline from '../actions'

export default {
	...doAuth,
	...addTrip,
	...getTrips,
	...getTripbyId,
	...addTimeline,
	...getTimeline
}
