import { call, put, takeEvery } from 'redux-saga/effects'

import {getFromApi} from '../api/events';


function getVenues() {
  return getFromApi('/venues.json');
}

function* fetchVenues(action) {
   try {
      const venues = yield call(getVenues);
      yield put({type: 'GET_VENUES_SUCCESS', venues: venues});
   } catch (e) {
      yield put({type: 'GET_VENUES_FAILED', message: e.message});
   }
}

function* venueSaga() {
   yield takeEvery('GET_VENUES_REQUESTED', fetchVenues);
}

export default venueSaga;