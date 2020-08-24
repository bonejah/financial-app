import React from "react";

import UserService from "../services/userService";
import { AuthContext } from "../main/providerAuthentication"
import { errorMessage } from "../components/toastr"

class Home extends React.Component {

  constructor() {
    super();
    this.service = new UserService();
  }

  state = {
    balance: 0
  }

  componentDidMount() {
    const userLogged = this.context.userAuthenticated;
    
    this.service.getBalanceById(userLogged.id)
      .then(response => {
        this.setState({balance: response.data});
      }).catch(error => {
        errorMessage(error.response.data);
      });
  }

  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-3">Welcome!</h1>
        <p className="lead">This is your finance system.</p>
        <p className="lead">Your balance for the current month is R $ {this.state.balance}</p>
        <hr className="my-4" />
        <p>This is your administrative area, use one of the menus or buttons below to browse the system.</p>
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="#/register-user" role="button">
            <i className="pi pi-users"></i>Register User
          </a>
          <a className="btn btn-danger btn-lg" href="#/register-balance" role="button">
            <i className="pi pi-money-bill"></i>Register Balance
          </a>
        </p>
      </div>
    );
  }
}

Home.contextType = AuthContext;

export default Home;
