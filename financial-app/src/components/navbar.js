import React from "react";

import NavBarItem from "./navbarItem";

import { AuthConsumer } from "../main/providerAuthentication";

function NavBar(props) {

  return(
    <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div className="container">
        <a href="#/home" className="navbar-brand">My Finances</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav">
            <NavBarItem render={props.isUserAuthenticated} href="#/home" label="Home" />
            <NavBarItem render={props.isUserAuthenticated} href="#/register-user" label="Users" />
            <NavBarItem render={props.isUserAuthenticated} href="#/check-balance" label="Balance" />
            <NavBarItem render={props.isUserAuthenticated} onClick={props.logoff} href="#/login" label="Exit" />
          </ul>
        </div>
      </div>
    </div>
  );

}

export default () => (
  <AuthConsumer>
    {(context) => (
      <NavBar isUserAuthenticated={context.isAuthenticated} logoff={context.closeSession}/>
    )}
  </AuthConsumer>
)
