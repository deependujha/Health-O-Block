// create a redux slice for the admin panel page if it allowed to visit or not

import { createSlice } from '@reduxjs/toolkit';

export const doctorSlice = createSlice({
	name: 'doctor',

	initialState: {
		refreshVal: 0,
		address: '',
	},

	reducers: {
		setAddress: (state, action) => {
			state.address = action.payload;
		},

		setRefreshVal: (state) => {
			state.refreshVal = 1 - state.refreshVal;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setAddress, setRefreshVal } = doctorSlice.actions;

// this reducer will be passed in store's 'reducer' key
export default doctorSlice.reducer;
