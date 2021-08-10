import { RootState } from './../../app/store';
import { City } from './../../model/city';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListResponse } from '../../model';

export interface cityState {
  loading: boolean;
  list: City[];
}

const initialState: cityState = {
  loading: false,
  list: [],
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityList(state) {
      state.loading = true;
    },
    fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchCityListFailed(state) {
      state.loading = false;
    },
  },
});

// Actions

export const cityActions = citySlice.actions;

//Selector
export const selectCityList = (state: RootState) => state.city.list;
export const selectCityMap = createSelector(selectCityList, (cityList) =>
  cityList.reduce((map: { [key: string]: City }, city) => {
    map[city.code] = city;
    return map;
  }, {})
);

//reducers

const cityReduce = citySlice.reducer;
export default cityReduce;
