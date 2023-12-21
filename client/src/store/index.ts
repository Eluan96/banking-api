import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";


export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    // auth: authReducer,
    // targets: targetReducer,

    // groups: createGroupReducer
  },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
