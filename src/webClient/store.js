import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";
import initialState from "./app/initialState";
import { persistStore, autoRehydrate } from "redux-persist";
import { REHYDRATE } from "redux-persist/constants";
import localforage from "localforage";

const enhancers = [];
const middleware = [];

const enableLogger = true;
if (enableLogger) {
  // const ignoredActions = [REHYDRATE];
  const ignoredActions = [];
  const logger = createLogger({
    collapsed: true,
    predicate: (getState, action) => ignoredActions.indexOf(action.type) === -1
  });
  middleware.push(logger);
}

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  autoRehydrate({ log: true }),
  ...enhancers
);

const store = createStore(rootReducer, initialState, composedEnhancers);

persistStore(
  store,
  {
    storage: localforage,
    debounce: 33,
    whitelist: ["intl", "multiForm"]
  },
  () => {
    console.log("we actually called rehydrate");
  }
);

export default store;
