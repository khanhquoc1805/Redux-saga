import { all } from '@redux-saga/core/effects';
import authSaga from '../features/auth/authSaga';
import counterSaga from '../features/counter/counterSaga';

export default function* rootSaga() {
  yield all([counterSaga(), authSaga()]);
}
