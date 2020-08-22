import React from "react";
import { withRouter } from "react-router-dom";

import Card from "../../components/cards";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentoTable from "../lancamento/lancamentoTable";
import { errorMessage, successMessage, warningMessage } from "../../components/toastr";

import LancamentoService from "../../services/lancamentoService";
import LocalStorageService from "../../services/localStorageService";

import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";

class ConsultaLancamento extends React.Component {

  constructor() {
    super();
    this.service = new LancamentoService();
  }

  state = {
    ano: "",
    mes: "",
    tipo: "",
    descricao: "",
    lancamentos: [],
    lancamentoDeletar: {},
    showConfirmDialog: false
  }

  preparaFormularioCadastro = () => {
    this.props.history.push("/cadastro-lancamento");
  }

  alterarStatus = (lancamento, status) => {
    this.service.alterarStatus(lancamento.id, status)
      .then(response => {
        const lancamentos = this.state.lancamentos;
        const index = lancamentos.indexOf(lancamento);
        if (index !== -1) {
          lancamento["status"] = status;
          lancamentos[index] = lancamento;
          this.setState({ lancamentos });
        }
        successMessage("Status atualizado com sucesso!");
      }).catch(error => {
        errorMessage(error.response.data);
      });
  }

  buscar = () => {
    if (!this.state.ano) {
      warningMessage("Field year is required.")
      return false;
    }
    const usuarioLogado = LocalStorageService.getItem("_usuarioLogado")

    const lancamentoFiltro = {
      ano: this.state.ano,
      mes: this.state.mes,
      tipo: this.state.tipo,
      descricao: this.state.descricao,
      usuario: usuarioLogado.id
    }

    this.service.consultar(lancamentoFiltro)
      .then(response => {
        const lista = response.data;

        if (lista.length < 1) {
          warningMessage("Nenhum resultado encontrado!")
        }
        this.setState({ lancamentos: lista })
      }).catch(error => {
        errorMessage(error.response.data)
      });
  }

  edit = (id) => {
    this.props.history.push(`/cadastro-lancamento/${id}`);
  }
  
  delete = () => {
    this.service.deletar(this.state.lancamentoDeletar.id)
      .then(response => {
        const lancamentos = this.state.lancamentos;
        const index = lancamentos.indexOf(this.state.lancamentoDeletar);
        lancamentos.splice(index, 1);
        this.setState({ lancamentos: lancamentos, showConfirmDialog: false });
        successMessage("Lancamento deletado com sucesso!");
      }).catch(error => {
        errorMessage(error.response.data)
      });
  }

  abrirConfirmacao = (lancamento) => {
    this.setState({ showConfirmDialog: true, lancamentoDeletar: lancamento })
  }

  fecharConfirmacao = () => {
    this.setState({ showConfirmDialog: false, lancamentoDeletar: {} })
  }

  render(){
    const months = this.service.obterListaMeses();
    const types = this.service.obterListaTipos();

    const confirmDialogFooter = (
      <div>
        <Button label="Confirmar" icon="pi pi-check" onClick={this.delete} />
        <Button label="Cancelar" icon="pi pi-times" onClick={this.fecharConfirmacao} className="p-button-secondary" />
      </div>
    )

    return (
      <Card title="Consulta Lancamentos">
        <div className="row">
          <div className="col-md-6">
            <div className="bs-component">
              <FormGroup htmlFor="inputAno" label="Ano: *">
                <input type="text"
                  className="form-control"
                  id="inputAno"
                  value={this.state.ano}
                  onChange={e => this.setState({ ano: e.target.value })}
                  placeholder="Digito o ano" />
              </FormGroup>
              <FormGroup htmlFor="inputMes" label="Mes:">
                <SelectMenu id="inputMes"
                  value={this.state.mes}
                  onChange={e => this.setState({ mes: e.target.value })}
                  className="form-control" 
                  lista={months}/>
              </FormGroup>
              <FormGroup htmlFor="inputTipo" label="Tipo Lancamento:">
                <SelectMenu id="inputTipo"
                  value={this.state.tipo}
                  onChange={e => this.setState({ tipo: e.target.value })}
                  className="form-control" lista={types}/>
              </FormGroup>
              <FormGroup htmlFor="inputDes" label="Descricao:">
                <input id="inputDes"
                  value={this.state.descricao}
                  onChange={e => this.setState({ descricao: e.target.value })}
                  className="form-control" 
                  placeholder="Digite a descricao" />
              </FormGroup>
              <button onClick={this.buscar} type="button" className="btn btn-success">
                <i className="pi pi-search"></i>Buscar
              </button>
              <button onClick={this.preparaFormularioCadastro} type="button" className="btn btn-danger">
              <i className="pi pi-plus"></i>Cadastrar
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <div className="bs-component">
              <LancamentoTable lancamentos={this.state.lancamentos}
                editAction={this.edit}
                deleteAction={this.abrirConfirmacao} 
                alterarStatus={this.alterarStatus}/>
            </div>
          </div>
        </div>
        <div>
          <Dialog header="Confirmacao"
            visible={this.state.showConfirmDialog}
            style={{ width: "50vw" }}
            modal={true}
            footer={confirmDialogFooter}
            onHide={() => this.setState({ showConfirmDialog: false})}>
          Confirma a exclusao deste lancamento?
          </Dialog>
        </div>
      </Card>
    );
  }
}

export default withRouter(ConsultaLancamento);