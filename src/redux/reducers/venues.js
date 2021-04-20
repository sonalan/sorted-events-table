import * as type from '../types';

const initialState ={
    venues:[],
}

export default function venues(state = initialState, action) {
  switch (action.type) {
    case type.GET_VENUES_REQUESTED:
      return {
        ...state,
        loading: true,
      }
    case type.GET_VENUES_SUCCESS:
      return {
        ...state,
        loading: false,
        venues: action.venues
        }
    case type.GET_VENUES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}