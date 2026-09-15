import { combineReducers, configureStore, isAction, Middleware } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({ tasks: tasksReducer, user: userReducer });
export type RootState = ReturnType<typeof rootReducer>;

const stateLogger: Middleware<{}, RootState> = (api) => (next) => (action) => {
  const showLog = typeof __DEV__ !== 'undefined' && __DEV__ && isAction(action);
  if (showLog) {
    console.log('[Redux] Acción:', action.type);
    console.log('[Redux] Estado anterior:', JSON.stringify(api.getState(), null, 2));
  }
  const result = next(action);
  if (showLog) {
    console.log('[Redux] Estado actualizado:', JSON.stringify(api.getState(), null, 2));
  }
  return result;
};

export function createAppStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stateLogger),
  });
}

export const store = createAppStore();
export type AppDispatch = typeof store.dispatch;

