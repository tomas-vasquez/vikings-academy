import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin";
import AuthLayout from "layouts/Auth";
import CourseLayouth from "layouts/Course";

import "assets/css/black-dashboard-react.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { myRoutes } from "config";

import { Provider } from "react-redux";
import store, { history } from "store";
import { ConnectedRouter } from "connected-react-router";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {/* <Suspense fallback={<SSuspense />}> */}
      <Switch>
        <Route
          exact
          path={myRoutes.login}
          render={(props) => <AuthLayout {...props} />}
        />
        <Route
          exact
          path={myRoutes.register}
          render={(props) => <AuthLayout {...props} />}
        />
        <Route
          exact
          path={"/"}
          render={(props) => <AdminLayout {...props} />}
        />
        <Route
          exact
          path={myRoutes.profile}
          render={(props) => <AdminLayout {...props} />}
        />
        <Route
          exact
          path={myRoutes.courses}
          render={(props) => <AdminLayout {...props} />}
        />
        <Route render={(props) => <CourseLayouth {...props} />} />
      </Switch>
      {/* </Suspense> */}
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
