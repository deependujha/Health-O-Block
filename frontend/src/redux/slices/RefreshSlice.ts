// create a redux slice for the admin panel page if it allowed to visit or not

import { createSlice } from '@reduxjs/toolkit';

export const refreshSlice = createSlice({
	name: 'refreshSlice',

	initialState: {
		value: 0,
	},

	reducers: {
		changeValue: (state) => {
			state.value = 1 - state.value;
		},
	},
});

// Action creators are generated for each case reducer function
export const { changeValue } = refreshSlice.actions;

// this reducer will be passed in store's 'reducer' key
export default refreshSlice.reducer;
