import React from "react";
import { Route } from "react-router-dom";
import { PrivateRoute, ModalSwitch, Loading } from "./appComponents";
import { AnimatedRoute, withTracker } from "../components";
import Loadable from "react-loadable";
import Home from "../pages/Home";
import TransitionsAndTeleport from "../pages/TransitionsAndTeleport/index";
import ConsumeServices from "../pages/ConsumeServices/index";
import Intl from "../pages/Intl/index";
import Private from "../pages/Private";
import Waypoint from "../pages/Waypoint";
import NewLanding from "../pages/NewLanding";
import MultiForm from "../pages/MultiForm";
import CMS from "../pages/CMS";
import NoMatch from "../pages/NoMatqch";

// Lazy loaded pages
// import Auth from "../pages/Auth";
// import LottieAndModals from "../pages/LottieAndModals/index";
// import ReduxDemo from "../pages/ReduxDemo/index";

// Currently removed pages
// import Mixins from "../pages/Mixins";

export const routes = [
  {
    title: "Home",
    path: "/",
    component: Home,
    exact: true
  },
  {
    title: "Transitions And Teleport",
    path: "/transitions_and_teleport",
    component: TransitionsAndTeleport
  },
  // TODO: Mixins currently trip on production build
  // {
  //   title: "Mixins",
  //   path: "/Mixins",
  //   component: Mixins
  // },
  {
    title: "Consume Services",
    path: "/consume_services",
    component: Loadable({
      loader: () => {
        return import("../pages/ConsumeServices/index");
      },
      loading: Loading
    })
  },
  {
    title: "Waypoint",
    path: "/waypoint",
    component: Loadable({
      loader: () => {
        return import("../pages/Waypoint");
      },
      loading: Loading
    })
  },
  {
    title: "Lottie And Modals",
    path: "/lottie_and_modals",
    component: Loadable({
      loader: () => import("../pages/LottieAndModals/index"),
      loading: Loading
    })
  },
  {
    title: "Redux Demo",
    path: "/reduxDemo",
    component: Loadable({
      loader: () => {
        return import("../pages/Redux/index");
      },
      loading: Loading
    })
  },
  {
    title: "Auth",
    path: "/auth",
    component: Loadable({
      loader: () => {
        return import("../pages/Auth");
      },
      loading: Loading
    }),
    modal: true
  },
  {
    title: "ImageCapture",
    path: "/imageCapture",
    component: Loadable({
      loader: () => {
        return import("../pages/ImageCapture/index");
      },
      loading: Loading
    })
  },
  {
    title: "Data Viz",
    path: "/dataViz",
    component: Loadable({
      loader: () => {
        return import("../pages/DataViz/index");
      },
      loading: Loading
    })
  },
  {
    title: "Private",
    path: "/private",
    component: Private,
    protected: true,
    animated: true
  },
  {
    title: "MultiForm",
    path: "/multiForm",
    component: Loadable({
      loader: () => {
        return import("../pages/MultiForm/index");
      },
      loading: Loading
    })
  },
  {
    title: "Intl",
    path: "/intl",
    component: Loadable({
      loader: () => {
        return import("../pages/Intl/index");
      },
      loading: Loading
    })
  },
  {
    title: "CMS",
    path: "/cms",
    component: CMS
  },
  {
    title: "Animation View",
    path: "/anim/:id",
    component: Loadable({
      loader: () => import("../pages/AnimationView"),
      loading: Loading
    }),
    hidden: true
  }
];

const RouteIn = props =>
  props.protected ? (
    <PrivateRoute {...props} component={props.component} />
  ) : (
    <Route {...props} key={props.key} component={props.component} />
  );

const Routes = () => {
  return (
    <ModalSwitch>
      {routes.map((route, i) => {
        const Component = route.component;
        return route.animated ? (
          <AnimatedRoute key={route.title} {...route}>
            <RouteIn {...route} key={route.title} />
          </AnimatedRoute>
        ) : (
          <RouteIn key={route.title} {...route} />
        );
      })}
      <Route
        key="authCallback"
        path="/callback"
        component={Loadable({
          loader: () => {
            return import("./appComponents/AuthCallback");
          },
          loading: Loading
        })}
      />
      <Route key="noMatch" component={NoMatch} />
    </ModalSwitch>
  );
};

export default Routes;
