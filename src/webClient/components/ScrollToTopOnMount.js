import React from "react";
import NoSSR from "react-no-ssr";

class ScrollToTopOnMount extends React.Component {
  componentDidMount(prevProps) {
    window.scrollTo(0, 0);
  }

  render() {
    return null;
  }
}

export default () =>
  <NoSSR>
    <ScrollToTopOnMount />
  </NoSSR>;
