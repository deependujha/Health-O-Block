// create a redux slice for the admin panel page if it allowed to visit or not

import { createSlice } from '@reduxjs/toolkit';

export const adminPanelSlice = createSlice({
	name: 'adminPanel',

	initialState: {
		allowed: false,
	},

	reducers: {
		setAllowed: (state, action) => {
			state.allowed = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setAllowed } = adminPanelSlice.actions;

// this reducer will be passed in store's 'reducer' key
export default adminPanelSlice.reducer;
