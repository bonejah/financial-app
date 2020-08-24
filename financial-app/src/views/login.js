import React from "react";
import { withRouter } from "react-router-dom";

import Card from "./../components/cards";
import FormGroup from "../components/form-group";
import { errorMessage} from "../components/toastr";

import UserService from "../services/userService";

import { AuthContext } from "../main/providerAuthentication";
 
class Login extends React.Component {

  constructor(){
    super();
    this.service = new UserService();
  }

  state = {
    email: "",
    password: ""
  };

  signin = () => {
    this.service.authenticate({
      email: this.state.email,
      password: this.state.password
    }).then(response => {
      this.context.beginSession(response.data);
      this.props.history.push("/home");
    }).catch(error => {
      errorMessage(error.response.data);
    })
  };

  registerUser = () => {
    this.props.history.push("/register-user");
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6" style={{ position: "relative", left: "300px" }}>
          <div className="bs-docs-section">
            <Card title="Login">
              <div className="row">
                <div className="col-lg-12">
                  <div className="bs-component">
                    <form>
                      <fieldset>
                        <FormGroup label="Email: *" htmlFor="inputEmail">
                          <input type="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}
                            className="form-control" id="inputEmail" aria-describedby="emailHelp"placeholder="Enter email"/>
                        </FormGroup>
                        <FormGroup label="Password: *" htmlFor="inputPassword">
                          <input type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })}
                            className="form-control" id="inputPassword" placeholder="Enter password"/>
                        </FormGroup>
                        <button onClick={this.signin} className="btn btn-success">
                          <i className="pi pi-sign-in"></i>Sign In
                        </button>
                        <button onClick={this.registerUser} className="btn btn-danger">
                          <i className="pi pi-plus"></i>Register User
                        </button>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

Login.contextType = AuthContext;

export default withRouter(Login);
