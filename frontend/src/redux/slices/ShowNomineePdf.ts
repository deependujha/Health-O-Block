import { createSlice } from "@reduxjs/toolkit";

const ShowNomineePdfSlice = createSlice({
	name: 'showNomineePdf',
	initialState: {
		showNomineePdf: false,
		userAddress: '',
		userName:''
	},

	reducers: {
		setShowNomineePdf: (state, action) => {
			state.showNomineePdf = action.payload.showNomineePdf;
            state.userAddress = action.payload.userAddress;
            state.userName = action.payload.userName;
		},
	},
});

export const { setShowNomineePdf } = ShowNomineePdfSlice.actions;
export default ShowNomineePdfSlice.reducer;