import React from "react";
import ReactDOM from "react-dom";
import defer from "lodash/defer";
import uniqueId from "lodash/uniqueId";
import { Provider as ThemeProvider } from "@mjsisley/rebass";
import { BrowserRouter as Router } from "react-router-dom";
import { IntlProvider } from "react-intl-redux";
import { Provider as ReduxProvider } from "react-redux";
import store from "../store";

const style = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  zIndex: 10
};

class Teleport {
  i = uniqueId("teleport");
  m = document.body.appendChild(document.createElement("m"));
  M = () => (
    <x style={style}>{React.cloneElement(this.el, { clear: this.clear })}</x>
  );

  init = el => {
    this.el = el;
    this._render();
  };
  clear = () => {
    defer(ReactDOM.unmountComponentAtNode, this.m);
  };

  _render = () => {
    ReactDOM.render(
      <ReduxProvider store={store}>
        <IntlProvider>
          <Router>
            <ThemeProvider
              theme={{
                font:
                  '"Work Sans", "Helvetica Neue", "Calibri Light", "Roboto", sans-serif'
              }}
            >
              <this.M />
            </ThemeProvider>
          </Router>
        </IntlProvider>
      </ReduxProvider>,
      this.m
    );
  };
}

export default new Teleport();
