import React from "react";
import { Switch, Route } from "react-router-dom";
import { TopPage, Teleport } from "../../components";
import Loadable from "react-loadable";
import Loading from "./Loading";
// import AnimModal from "../../modals/Anim";
// import AuthModal from "../../modals/Auth";

class ModalSwitch extends React.Component {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location, children } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    ); // not initial render
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          {children}
        </Switch>
        {isModal
          ? <Route
              path={`/anim/:id`}
              component={Loadable({
                loader: () => import("../../modals/Anim"),
                loading: Loading
              })}
            />
          : null}
        {isModal
          ? <Route
              path="/auth"
              component={Loadable({
                loader: () => import("../../modals/Auth"),
                loading: Loading
              })}
            />
          : null}
      </div>
    );
  }
}

export default props =>
  <Route render={routeProps => <ModalSwitch {...routeProps} {...props} />} />;
