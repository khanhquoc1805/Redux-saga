import { PayloadAction } from '@reduxjs/toolkit';



export function* log(action: PayloadAction){
    console.log('Log',action)
}
export default function* couterSaga() {
}