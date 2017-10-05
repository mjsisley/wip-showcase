import React from "react";
import { render } from "react-snapshot";
import { injectGlobal } from "styled-components";
import styledNormalize from "styled-normalize";
import App from "./app/App";
// import registerServiceWorker from './registerServiceWorker';
import Raven from "raven-js";

Raven.config(
  "https://acaf309e555c4a099deb3be682d23299@sentry.io/211788"
).install();

export default () => {
  injectGlobal`
  ${styledNormalize}
  * { box-sizing: border-box; }
  body { 
    margin: 0;
    padding: 0;
    font-family: sans-serif; 
  }
`;

  const rootEl = document.getElementById("root");
  render(<App />, rootEl);
  // registerServiceWorker();

  if (module.hot) {
    module.hot.accept("./app/App", () => {
      const NextApp = require("./app/App").default;
      render(<NextApp />, rootEl);
    });
  }
};
