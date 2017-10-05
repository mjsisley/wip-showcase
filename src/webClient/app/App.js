import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router } from "react-router-dom";
import { withRouter } from "react-router";
import Routes from "./Routes";
import { Provider as ReduxProvider, connect } from "react-redux";
import { Provider as ThemeProvider } from "@mjsisley/rebass";
import { IntlProvider } from "react-intl-redux";
import { Header, Footer } from "./appComponents";
import { Flex, Page } from "../components";
import store from "../store";
import { updateIntl } from "react-intl-redux";
import { REHYDRATE } from "redux-persist/constants";
import ReactGA from "react-ga";

// TODO: Pull out to config file
ReactGA.initialize("UA-78158803-6");

class GAListener extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    this.sendPageView(this.context.router.history.location);
    this.context.router.history.listen(this.sendPageView);
  }

  sendPageView(location) {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }

  render() {
    return this.props.children;
  }
}

const App = withRouter(
  connect(state => ({
    rehydrated: state.multiForm.rehydrated
  }))(
    class App extends React.Component {
      render() {
        return (
          // this.props.rehydrated && (
          <Page px={0} mx={0} mb="12px" w="100%" absoluteHeader>
            <Header />
            <Flex w="100%">
              <Routes />
            </Flex>
            <Footer />
          </Page>
          // )
        );
      }
    }
  )
);

export default class ConfigApp extends React.Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <IntlProvider>
          <Router>
            <GAListener>
              <ThemeProvider
                theme={{
                  font:
                    '"Work Sans", "Helvetica Neue", "Calibri Light", "Roboto", sans-serif'
                }}
              >
                <App />
              </ThemeProvider>
            </GAListener>
          </Router>
        </IntlProvider>
      </ReduxProvider>
    );
  }
}
