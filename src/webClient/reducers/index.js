import { combineReducers } from "redux";
import homeReducer from "./home";
import reduxReducer from "./redux";
import multiFormReducer from "./multiForm";
import { intlReducer } from "react-intl-redux";
// import aboutReducer from "./about";

export default combineReducers({
  home: homeReducer,
  redux: reduxReducer,
  intl: intlReducer,
  multiForm: multiFormReducer
  //   about: aboutReducer
});
