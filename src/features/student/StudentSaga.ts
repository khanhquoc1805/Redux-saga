
import { ListParams, ListResponse, Student } from './../../model';
import { PayloadAction } from '@reduxjs/toolkit';
import { studentActions } from './StudentSlice';
import { takeLatest, call, put,debounce } from '@redux-saga/core/effects';
import studentApi from '../../api/studentApi';


function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);

    yield put(studentActions.fetchStudentSuccess(response));
  } catch (error) {
      yield put(studentActions.fetchStudentFailed());
  }
}

function* handleSearchChange(action: PayloadAction<ListParams>){
  yield put(studentActions.setFilter(action.payload));
}

export default function* studentSaga() {
  yield takeLatest(studentActions.fetchStudentList, fetchStudentList);

  yield debounce(500,studentActions.setFilterWithDebounce.type, handleSearchChange);
}
