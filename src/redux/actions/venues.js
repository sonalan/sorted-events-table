import * as type from '../types';

export function getVenues(venues){
    return {
        type: type.GET_VENUES_REQUESTED,
        payload: venues
    }
}