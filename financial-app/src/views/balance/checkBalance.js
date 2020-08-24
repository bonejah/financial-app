import React from "react";
import { withRouter } from "react-router-dom";

import Card from "../../components/cards";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import { errorMessage, successMessage, warningMessage } from "../../components/toastr";
import BalanceTable from "./balanceTable";

import BalanceService from "../../services/balanceService";
import AuthService from "../../services/authService";

import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";

class CheckBalance extends React.Component {

  constructor() {
    super();
    this.service = new BalanceService();
  }

  state = {
    year: "",
    month: "",
    type: "",
    description: "",
    balances: [],
    balanceToDelete: {},
    showConfirmDialog: false
  }

  registerBalance = () => {
    this.props.history.push("/register-balance");
  }

  updateStatus = (balance, status) => {
    this.service.updateStatus(balance.id, status)
      .then(response => {
        const balances = this.state.balances;
        const index = balances.indexOf(balance);
        if (index !== -1) {
          balance["status"] = status;
          balances[index] = balance;
          this.setState({ balances });
        }
        successMessage("Status updated with success!");
      }).catch(error => {
        errorMessage(error.response.data);
      });
  }

  search = () => {
    if (!this.state.year) {
      warningMessage("Field year is required.")
      return false;
    }

    const userLogged = AuthService.getUserAuthenticated()

    const balanceFilter = {
      year: this.state.year,
      month: this.state.month,
      type: this.state.type,
      description: this.state.description,
      userId: userLogged.id
    }

    console.log(balanceFilter)

    this.service.getBalance(balanceFilter)
      .then(response => {
        const result = response.data;

        if (result.length < 1) {
          warningMessage("No results found!")
        }
        this.setState({ balances: result });
      }).catch(error => {
        errorMessage(error.response.data);
      });
  }

  edit = (id) => {
    this.props.history.push(`/register-balance/${id}`);
  }
  
  delete = () => {
    this.service.delete(this.state.balanceToDelete.id)
      .then(response => {
        const balances = this.state.balances;
        const index = balances.indexOf(this.state.balanceToDelete);
        balances.splice(index, 1);
        this.setState({ balances: balances, showConfirmDialog: false });
        successMessage("Balance deleted with success!");
      }).catch(error => {
        errorMessage(error.response.data);
      });
  }

  showModal = (balance) => {
    this.setState({ showConfirmDialog: true, balanceToDelete: balance })
  }

  closeModal = () => {
    this.setState({ showConfirmDialog: false, balanceToDelete: {} })
  }

  render(){
    const months = this.service.getListMonths();
    const types = this.service.getListTypes();

    const confirmDialogFooter = (
      <div>
        <Button label="Confirm" icon="pi pi-check" onClick={this.delete} />
        <Button label="Cancel" icon="pi pi-times" onClick={this.closeModal} className="p-button-secondary" />
      </div>
    )

    return (
      <Card title="Check Balances">
        <div className="row">
          <div className="col-md-6">
            <div className="bs-component">
              <FormGroup htmlFor="inputYear" label="Year: *">
                <input type="text"
                  className="form-control"
                  id="inputYear"
                  value={this.state.year}
                  onChange={e => this.setState({ year: e.target.value })}
                  placeholder="Input year" />
              </FormGroup>
              <FormGroup htmlFor="inputMonth" label="Month:">
                <SelectMenu id="inputMonth"
                  value={this.state.month}
                  onChange={e => this.setState({ month: e.target.value })}
                  className="form-control" 
                  list={months}/>
              </FormGroup>
              <FormGroup htmlFor="inputType" label="Type Balance:">
                <SelectMenu id="inputType"
                  value={this.state.type}
                  onChange={e => this.setState({ type: e.target.value })}
                  className="form-control" list={types}/>
              </FormGroup>
              <FormGroup htmlFor="inputDescription" label="Description:">
                <input id="inputDescription"
                  value={this.state.description}
                  onChange={e => this.setState({ description: e.target.value })}
                  className="form-control" 
                  placeholder="Input description" />
              </FormGroup>
              <button onClick={this.search} type="button" className="btn btn-success">
                <i className="pi pi-search"></i>Search
              </button>
              <button onClick={this.registerBalance} type="button" className="btn btn-danger">
              <i className="pi pi-plus"></i>Register Balance
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <div className="bs-component">
              <BalanceTable balances={this.state.balances}
                editAction={this.edit}
                deleteAction={this.showModal} 
                editStatus={this.updateStatus}/>
            </div>
          </div>
        </div>
        <div>
          <Dialog header="Confirmation"
            visible={this.state.showConfirmDialog}
            style={{ width: "50vw" }}
            modal={true}
            footer={confirmDialogFooter}
            onHide={() => this.setState({ showConfirmDialog: false})}>
            Do you confirm the exclusion of this balance?
          </Dialog>
        </div>
      </Card>
    );
  }
}

export default withRouter(CheckBalance);