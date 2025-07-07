import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import preferenceReducer from '../features/preferenceSlice';
import locationReducer from '../features/locationsSlice';
import monthReducer from '../features/monthSlice';
import eventReducer from '../features/eventSlice';
import categoryReducer from '../features/categorySlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    preference: preferenceReducer,
    location: locationReducer,
    month: monthReducer,
    event: eventReducer,
    category: categoryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
