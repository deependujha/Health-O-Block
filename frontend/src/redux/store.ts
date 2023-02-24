import { configureStore } from '@reduxjs/toolkit';
import AdminPanelReducer from './slices/AdminPanelSlice';
import CitizenReducer from './slices/CitizenSlice';

export const store = configureStore({
	reducer: {
		adminPanel: AdminPanelReducer,
		citizen: CitizenReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
