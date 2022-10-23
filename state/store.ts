import {
  legacy_createStore as createStore,
  applyMiddleware,
  Middleware,
  Store,
  AnyAction,
} from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combinedReducer, RootState } from './reducers';
import { type Action } from './action';

const bindMiddlewares = (middlewares: Middleware[]) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middlewares));
  }
  // don't add the devtools in production
  return applyMiddleware(...middlewares);
};

const masterReducer = (state: RootState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return combinedReducer(state, action as Action);
};

const makeStore = () => {
  // @ts-ignore
  return createStore<Store<RootState>>(masterReducer, bindMiddlewares([thunk]));
};

export const wrapper = createWrapper(makeStore);
