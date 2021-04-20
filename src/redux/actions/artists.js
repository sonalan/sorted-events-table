import * as type from '../types';

export function getArtists(artists){
    return {
        type: type.GET_ARTISTS_REQUESTED,
        payload: artists
    }
}