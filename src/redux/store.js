import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import peopleReducer from './peopleRedux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  people: peopleReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
