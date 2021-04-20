import * as type from '../types';

export function getEvents(events){
    return {
        type: type.GET_EVENTS_REQUESTED,
        payload: events
    }
}