import React from "react";
import { withRouter } from "react-router-dom";

import Card from "../../components/cards";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import { successMessage, errorMessage } from "../../components/toastr";

import BalanceService from "../../services/balanceService";
import AuthService from "../../services/authService";

class RegisterBalance extends React.Component {

  constructor() {
    super();
    this.service = new BalanceService();
  }

  state = {
    id: null,
    description: "",
    value: "",
    year: "",
    month: "",
    type: "",
    status: "",
    userId: null,
    updating: false
  }

  componentDidMount() {
    const params = this.props.match.params;
    
    if (params.id) {
      this.service.getById(params.id)
        .then(response => {
          this.setState({ ...response.data, updating: true });
        }).catch(error => {
          errorMessage(error.response.data);
        });
    }
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name] : value })
  }

  save = () => {
    const userLogged = AuthService.getUserAuthenticated();
    const { description, value, year, month, type } = this.state;
    const balance = { description, value, year, month, type, userId: userLogged.id }
    
    try {
      this.service.validate(balance);
    } catch (error) {
      const messages = error.messages;
      messages.forEach(message => errorMessage(message));
      return false;
    }

    this.service.save(balance)
      .then(response => {
        this.props.history.push("/check-balance");
        successMessage("Balance saved with success!");
      }).catch(error => {
        errorMessage(error.response.data);
      });
  }

  update = () => {
    const { id, description, value, year, month, type, status, userId } = this.state;
    const balance = { id, description, value, year, month, type, status, userId };

    this.service.update(balance)
      .then(response => {
        this.props.history.push("/check-balance");
        successMessage("Balance updated with success!");
      }).catch(error => {
        errorMessage(error.response.data);
      });
  }

  render() {
    const types = this.service.getListTypes();
    const months = this.service.getListMonths();

    return (
      <Card title={this.state.updating ? "Edit balance" : "Register balance"}>
        <div className="row">
          <div className="col-md-12">
            <FormGroup id="inputDescription" label="Description: *">
              <input id="inputDescription" type="text" className="form-control" name="description" value={this.state.description} onChange={this.handleChange} />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormGroup id="inputYear" label="Year: *">
              <input id="inputYear" type="text" className="form-control" name="year" value={this.state.year} onChange={this.handleChange} />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup id="inputMonth" label="Month: *">
              <SelectMenu
                id="inputMonth"
                list={months}
                className="form-control"
                name="month" value={this.state.month} onChange={this.handleChange}
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <FormGroup id="inputValue" label="Value: *">
              <input id="inputValue" type="text" className="form-control" name="value" value={this.state.value} onChange={this.handleChange}/>
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="inputType" label="Type: *">
              <SelectMenu
                id="inputType"
                list={types}
                className="form-control"
                name="type" value={this.state.type} onChange={this.handleChange}
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="inputStatus" label="Status: ">
              <input
                id="inputStatus"
                type="text"
                className="form-control"
                name="status" value={this.state.status}
                disabled
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {
              this.state.updating ? 
              (
                <button onClick={this.update} className="btn btn-success">
                  <i className="pi pi-refresh"></i>Update
                </button>
              ) : 
              (
                <button onClick={this.save} className="btn btn-success">
                  <i className="pi pi-save"></i>Save
                </button>
              )
            }
            <button onClick={e => this.props.history.push("/check-balance")}  className="btn btn-danger">
              <i className="pi pi-times"></i>Cancel
            </button>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(RegisterBalance);
