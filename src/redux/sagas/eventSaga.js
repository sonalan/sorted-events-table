import { call, put, takeEvery } from 'redux-saga/effects'

import {getFromApi} from '../api/events';


function getEvents() {
  return getFromApi('/events.json');
}

function* fetchEvents(action) {
   try {
      const events = yield call(getEvents);
      yield put({type: 'GET_EVENTS_SUCCESS', events: events});
   } catch (e) {
      yield put({type: 'GET_EVENTS_FAILED', message: e.message});
   }
}

function* eventSaga() {
   yield takeEvery('GET_EVENTS_REQUESTED', fetchEvents);
}

export default eventSaga;