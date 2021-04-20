import * as type from '../types';

const initialState ={
    artists:[],
}

export default function artists(state = initialState, action) {
  switch (action.type) {
    case type.GET_ARTISTS_REQUESTED:
      return {
        ...state,
        loading: true,
      }
    case type.GET_ARTISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        artists: action.artists
        }
    case type.GET_ARTISTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}