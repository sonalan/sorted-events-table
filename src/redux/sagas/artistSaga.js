import { call, put, takeEvery } from 'redux-saga/effects'

import {getFromApi} from '../api/events';


function getArtists() {
  return getFromApi('/artists.json');
}

function* fetchArtists(action) {
   try {
      const artists = yield call(getArtists);
      yield put({type: 'GET_ARTISTS_SUCCESS', artists: artists});
   } catch (e) {
      yield put({type: 'GET_ARTISTS_FAILED', message: e.message});
   }
}

function* artistSaga() {
   yield takeEvery('GET_ARTISTS_REQUESTED', fetchArtists);
}

export default artistSaga;