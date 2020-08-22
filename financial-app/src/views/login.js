import React from "react";
import { withRouter } from "react-router-dom";

import Card from "./../components/cards";
import FormGroup from "../components/form-group";
import { errorMessage} from "../components/toastr";

import UsuarioService from "../services/usuarioService";

import { AuthContext } from "../main/providerAuthentication";
 
class Login extends React.Component {
  constructor(){
    super();
    this.service = new UsuarioService();
  }

  state = {
    email: "",
    senha: ""
  };


  entrar = () => {
    this.service.autenticar({
      email: this.state.email,
      senha: this.state.senha
    }).then(response => {
      this.context.beginSession(response.data);
      this.props.history.push("/home")
    }).catch(erro => {
      errorMessage(erro.response.data);
    });
  };

  prepareCadastrar = () => {
    this.props.history.push("/cadastro-usuario");
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
                        <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                          <input type="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}
                            className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"placeholder="Digite o Email"/>
                        </FormGroup>
                        <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                          <input type="password" value={this.state.senha} onChange={(e) => this.setState({ senha: e.target.value })}
                            className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                        </FormGroup>
                        <button onClick={this.entrar} className="btn btn-success">
                          <i className="pi pi-sign-in"></i>Entrar
                        </button>
                        <button onClick={this.prepareCadastrar} className="btn btn-danger">
                          <i className="pi pi-plus"></i>Cadastrar
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
