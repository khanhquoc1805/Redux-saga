import { all } from '@redux-saga/core/effects';
import authSaga from '../features/auth/authSaga';
import counterSaga from '../features/counter/counterSaga';
import dashboardSaga from '../features/dashboard/dashboardSaga';

export default function* rootSaga() {
  yield all([counterSaga(), authSaga(), dashboardSaga()]);
}
