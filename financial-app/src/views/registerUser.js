import React from "react";
import { withRouter } from "react-router-dom";

import Card from "../components/cards";
import FormGroup from "../components/form-group";
import { errorMessage, successMessage } from "../components/toastr";

import UserService from "../services/userService";

class RegisterUser extends React.Component {

  constructor() {
    super();
    this.service = new UserService();
  }

  state = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  save = () => {
    const { name, email, password, passwordConfirm } = this.state;
    const user = { name, email, password, passwordConfirm }

    try {
      this.service.validate(user);
    } catch (error) {
      const messages = error.messages;
      messages.forEach(message => errorMessage(message));
      return false;
    }

    this.service.save(user)
      .then(response => {
        successMessage("User created with success!!");
        this.props.history.push("/login");
      }).catch(error => {
        errorMessage(error.response.data);
      });
  };

  cancel = () => {
    this.props.history.push("/home");
  }

  render() {
    return (
      <Card title="Register User">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Name: *" htmlFor="inputName">
                <input type="text" id="inputName" name="name" className="form-control" onChange={(e) => this.setState({ name: e.target.value })} />
              </FormGroup>
              <FormGroup label="Email: *" htmlFor="inputEmail">
                <input type="email" id="inputEmail" name="email" className="form-control" onChange={(e) => this.setState({ email: e.target.value })} />
              </FormGroup>
              <FormGroup label="Password: *" htmlFor="inputPassword">
                <input type="password" id="inputPassword" name="password" className="form-control" onChange={(e) => this.setState({ password: e.target.value })} />
              </FormGroup>
              <FormGroup label="Confirm Password: *" htmlFor="inputPasswordConfirm">
                <input type="password" id="inputPasswordConfirm" name="passwordConfirm" className="form-control" onChange={(e) => this.setState({ passwordConfirm: e.target.value })} />
              </FormGroup>
              <button onClick={this.save} type="button" className="btn btn-success">
                <i className="pi pi-save"></i>Save
              </button>
              <button onClick={this.cancel} type="button" className="btn btn-danger">
                <i className="pi pi-times"></i>Cancel
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(RegisterUser);
