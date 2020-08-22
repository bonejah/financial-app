import React from "react";
import { withRouter } from "react-router-dom";

import Card from "../components/cards";
import FormGroup from "./../components/form-group";
import { errorMessage, successMessage } from "../components/toastr";

import UsuarioService from "../services/usuarioService";


class CadastroUsuario extends React.Component {

  constructor() {
    super();
    this.service = new UsuarioService();
  }

  state = {
    nome: "",
    email: "",
    senha: "",
    senhaRepeticao: "",
  };

  cadastrar = () => {
    const { nome, email, senha, senhaRepeticao } = this.state;
    const user = { nome, email, senha, senhaRepeticao }

    try {
      this.service.validar(user);
    } catch (error) {
      const mensagems = error.mensagens;
      mensagems.forEach(msg => errorMessage(msg));
      return false;
    }

    this.service.saveUser(user)
      .then(response => {
        successMessage("User created with success!!");
        this.props.history.push("/login");
      }).catch(error => {
        errorMessage(error.response.data);
      });
  };

  cancelar = () => {
    this.props.history.push("/home");
  }

  render() {
    return (
      <Card title="Cadastro de Usuário">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Nome: *" htmlFor="inputNome">
                <input type="text" id="inputNome" name="nome" className="form-control" onChange={(e) => this.setState({ nome: e.target.value })} />
              </FormGroup>
              <FormGroup label="Email: *" htmlFor="inputEmail">
                <input type="email" id="inputEmail" name="email" className="form-control" onChange={(e) => this.setState({ email: e.target.value })} />
              </FormGroup>
              <FormGroup label="Senha: *" htmlFor="inputSenha">
                <input type="password" id="inputSenha" name="senha" className="form-control" onChange={(e) => this.setState({ senha: e.target.value })} />
              </FormGroup>
              <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                <input type="password" id="inputRepitaSenha" name="repitaSenha" className="form-control" onChange={(e) => this.setState({ senhaRepeticao: e.target.value })} />
              </FormGroup>
              <button onClick={this.cadastrar} type="button" className="btn btn-success">
                <i className="pi pi-save"></i>Salvar
              </button>
              <button onClick={this.cancelar} type="button" className="btn btn-danger">
                <i className="pi pi-times"></i>Cancelar
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(CadastroUsuario);
