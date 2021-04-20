import { all } from 'redux-saga/effects'

import eventSaga from './eventSaga'
import artistSaga from './artistSaga'
import venueSaga from './venueSaga'

export default function* rootSaga() {
  yield all([
    eventSaga(),
    artistSaga(),
    venueSaga(),
  ])
}