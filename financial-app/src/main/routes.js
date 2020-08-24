import React from "react";
import { Route, Switch, HashRouter, Redirect } from "react-router-dom"; 

import Login from "../views/login";
import Home from "../views/home";
import RegisterUser from "../views/registerUser";
import CheckBalance from "../views/balance/checkBalance";
import RegisterBalance from "../views/balance/registerBalance";

import { AuthConsumer } from "./providerAuthentication";

function RouteAuthenticated({ component: Component, isUserAuthenticated, ...props }) {
  return (
    <Route {...props} render={( componentProps ) => {
      if (isUserAuthenticated) {
        return (
          <Component {...componentProps} />
        );
      } else {
        return (
          <Redirect to={{ pathname: "/login", state: { from: componentProps.location } }} />
        );
      }
    }} />
  )
}

function Routes (props) {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register-user" component={RegisterUser} />
        <RouteAuthenticated isUserAuthenticated={props.isUserAuthenticated} path="/home" component={Home} />
        <RouteAuthenticated isUserAuthenticated={props.isUserAuthenticated} path="/check-balance" component={CheckBalance} />
        <RouteAuthenticated isUserAuthenticated={props.isUserAuthenticated} path="/register-balance/:id?" component={RegisterBalance} />
      </Switch>
    </HashRouter>
  )
}

export default () => (
  <AuthConsumer>
    { (context) => (<Routes isUserAuthenticated={context.isAuthenticated} />) }
  </AuthConsumer>
)
