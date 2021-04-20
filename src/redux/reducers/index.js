import { combineReducers} from 'redux';

import events from './events'
import artists from './artists'
import venues from './venues'

const rootReducer = combineReducers({
    events: events,
    artists: artists,
    venues: venues,
});

export default rootReducer;