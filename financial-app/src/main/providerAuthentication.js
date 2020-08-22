import React from "react";

import AuthService from "../services/authService";

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

class ProviderAuthentication extends React.Component {

  state = {
    userAuthenticated: null,
    isAuthenticated: false
  }

  beginSession = (user) => {
    AuthService.login(user);
    this.setState({ userAuthenticated: user, isAuthenticated: true }); 
  }

  closeSession = () => {
    AuthService.removeUserAuthenticated();
    this.setState({ userAuthenticated: null, isAuthenticated: false }); 
  }

  render() {
    const context = {
      userAuthenticated: this.state.userAuthenticated,
      isAuthenticated: this.state.isAuthenticated,
      beginSession: this.beginSession,
      closeSession: this.closeSession
    }
    
    return (
      <AuthProvider value={ context }>
        { this.props.children }
      </AuthProvider>
    );
  }
}

export default ProviderAuthentication;