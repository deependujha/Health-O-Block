// create a redux slice for the admin panel page if it allowed to visit or not

import { createSlice } from '@reduxjs/toolkit';

export const uploadingDocSlice = createSlice({
	name: 'uploadingDoc',

	initialState: {
		uploading: false,
	},

	reducers: {
		setUploading: (state, action) => {
			state.uploading = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setUploading } = uploadingDocSlice.actions;

// this reducer will be passed in store's 'reducer' key
export default uploadingDocSlice.reducer;
