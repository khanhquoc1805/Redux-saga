import { call,put } from '@redux-saga/core/effects';
import { ListResponse } from './../../model/common';
import { cityActions } from './citySlice';
import { takeLatest } from '@redux-saga/core/effects';
import cityApi from '../../api/cityApi';
import { City } from '../../model';

export function* fetchCityList() {
    try {
       const response : ListResponse<City> =  yield call(cityApi.getAll);
       yield put(cityActions.fetchCityListSuccess(response))

    } catch (error) {
        yield put(cityActions.fetchCityListFailed());
    }
}


export default function* citySaga() {
    yield takeLatest(cityActions.fetchCityList.type,fetchCityList);
}