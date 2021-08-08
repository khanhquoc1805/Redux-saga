import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery } from "@redux-saga/core/effects"


export function* log(action: PayloadAction){
    console.log('Log',action)
}
export default function* couterSaga() {
}