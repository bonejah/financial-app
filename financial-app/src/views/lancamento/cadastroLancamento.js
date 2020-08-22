import React from "react";
import { withRouter } from "react-router-dom";

import Card from "../../components/cards";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import { successMessage, errorMessage } from "../../components/toastr";

import LancamentoService from "../../services/lancamentoService";
import LocalStorageService from "../../services/localStorageService";

class CadastroLancamento extends React.Component {

  constructor() {
    super();
    this.service = new LancamentoService();
  }

  state = {
    id: null,
    descricao: "",
    valor: "",
    ano: "",
    mes: "",
    tipo: "",
    status: "",
    usuario: null,
    atualizando: false
  }

  componentDidMount() {
    const params = this.props.match.params;
    
    if (params.id) {
      this.service.obterPorId(params.id)
        .then(response => {
          this.setState({ ...response.data, atualizando: true });
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

  submit = () => {
    const usuarioLogado = LocalStorageService.getItem("_usuarioLogado");
    const { descricao, valor, ano, mes, tipo } = this.state;
    const lancamento = { descricao, valor, ano, mes, tipo, usuario: usuarioLogado.id }
    
    try {
      this.service.validar(lancamento);
    } catch (error) {
      const mensagems = error.mensagens;
      mensagems.forEach(msg => errorMessage(msg));
      return false;
    }

    this.service.salvar(lancamento)
      .then(response => {
        this.props.history.push("/consulta-lancamento");
        successMessage("Lancamento cadastrado com sucesso!");
      }).catch(error => {
        errorMessage(error.response.data);
      });
  }

  atualizar = () => {
    const { descricao, valor, ano, mes, tipo, id, status, usuario } = this.state;
    const lancamento = { descricao, valor, ano, mes, tipo, id, status, usuario }

    console.log("lancamento", lancamento)

    this.service.atualizar(lancamento)
      .then(response => {
        this.props.history.push("/consulta-lancamento");
        successMessage("Lancamento atualizado com sucesso!");
      }).catch(error => {
        errorMessage(error.response.data);
      });
  }

  render() {
    const tipos = this.service.obterListaTipos();
    const meses = this.service.obterListaMeses();

    return (
      <Card title={this.state.atualizando ? "Edicao de Lancamento" : "Cadastro de Lancamento"}>
        <div className="row">
          <div className="col-md-12">
            <FormGroup id="inputDescricao" label="Descricao: *">
              <input id="inputDescricao" type="text" className="form-control" name="descricao" value={this.state.descricao} onChange={this.handleChange} />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormGroup id="inputAno" label="Ano: *">
              <input id="inputAno" type="text" className="form-control" name="ano" value={this.state.ano} onChange={this.handleChange} />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup id="inputMes" label="Mes: *">
              <SelectMenu
                id="inputMes"
                lista={meses}
                className="form-control"
                name="mes" value={this.state.mes} onChange={this.handleChange}
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <FormGroup id="inputValor" label="Valor: *">
              <input id="inputValor" type="text" className="form-control" name="valor" value={this.state.valor} onChange={this.handleChange}/>
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="inputTipo" label="Tipo: *">
              <SelectMenu
                id="inputTipo"
                lista={tipos}
                className="form-control"
                name="tipo" value={this.state.tipo} onChange={this.handleChange}
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
              this.state.atualizando ? 
              (
                <button onClick={this.atualizar} className="btn btn-success">
                  <i className="pi pi-refresh"></i>Atualizar
                </button>
              ) : 
              (
                <button onClick={this.submit} className="btn btn-success">
                  <i className="pi pi-save"></i>Salvar
                </button>
              )
            }
            <button onClick={e => this.props.history.push("/consulta-lancamento")}  className="btn btn-danger">
              <i className="pi pi-times"></i>Cancelar
            </button>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(CadastroLancamento);
