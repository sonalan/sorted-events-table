import { all } from 'redux-saga/effects'
import userSaga from './userSaga'
import eventSaga from './eventSaga'
import artistSaga from './artistSaga'
import venueSaga from './venueSaga'

export default function* rootSaga() {
  yield all([
    userSaga(),
    eventSaga(),
    artistSaga(),
    venueSaga(),
  ])
}