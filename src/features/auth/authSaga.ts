import { take, fork, call, delay,put } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { LoginPayload, authActions } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    delay(2500);
    localStorage.setItem('access_token', 'fake');
    yield put(authActions.loginSuccess({
      id: 1,
      name: 'Khanh Quoc',
    }))

    yield put(push('/admin'))
  } catch (error) {
yield put(authActions.loginfailed(error.message));

  }
}

function* handleLogOut() {
  localStorage.removeItem('access_token');
  // chuyen toi dang nhap
  yield put(push('/login'))

}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogOut);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
