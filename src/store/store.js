import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
const history = createHistory();

export default function configureStore(initialState) {
  // Be sure to ONLY add this middleware in development!
  const middleware =
    process.env.NODE_ENV !== "production"
      ? [require("redux-immutable-state-invariant").default(), thunk]
      : [thunk];

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware, routerMiddleware(history))
  );
}
