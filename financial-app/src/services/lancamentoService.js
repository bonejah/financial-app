import ApiService from "./apiService";

import ErroException from "../exceptions/errorException";

export default class LancamentoService extends ApiService {
  constructor() {
    super("/api/lancamentos");
  }

  obterListaMeses() {
    return [
      {label: 'Select...', value: ''},
      {label: 'January', value: '1'},
      {label: 'February', value: '2'},
      {label: 'March', value: '3'},
      {label: 'April', value: '4'},
      {label: 'May', value: '5'},
      {label: 'June', value: '6'},
      {label: 'July', value: '7'},
      {label: 'August', value: '8'},
      {label: 'September', value: '9'},
      {label: 'October', value: '10'},
      {label: 'November', value: '11'},
      {label: 'December', value: '12'}
    ];
  }

  obterListaTipos() {
    return [
      {label: 'Select...', value: ''},
      {label: 'Despesa', value: 'DESPESA'},
      {label: 'Receita', value: 'RECEITA'}
    ];
  }

  obterPorId(id) {
    return this.get(`/${id}`);
  }

  consultar(lancamentoFiltro) {
    let params = `?ano=${lancamentoFiltro.ano}`;

    if (lancamentoFiltro.mes) {
      params = `${params}&mes=${lancamentoFiltro.mes}`;
    }

    if (lancamentoFiltro.tipo) {
      params = `${params}&tipo=${lancamentoFiltro.tipo}`;
    }

    if (lancamentoFiltro.status) {
      params = `${params}&status=${lancamentoFiltro.status}`;
    }

    if (lancamentoFiltro.usuario) {
      params = `${params}&usuario=${lancamentoFiltro.usuario}`;
    }

    if (lancamentoFiltro.descricao) {
      params = `${params}&descricao=${lancamentoFiltro.descricao}`;
    }

    return this.get(params);
  }

  deletar(id) {
    return this.delete(`/${id}`);
  }

  salvar(lancamento) {
    return this.post("/", lancamento);
  }

  atualizar(lancamento) {
    return this.put(`/${lancamento.id}`, lancamento);
  }

  alterarStatus(id, status) {
    return this.put(`/${id}/atualiza-status`, { status })
  }

  validar(lancamento) {
    const erros = [];
    
    if(!lancamento.descricao) {
      erros.push("Informe a descricao.");
    }

    if(!lancamento.ano) {
      erros.push("Informe o ano.");
    }

    if(!lancamento.mes) {
      erros.push("Informe o mes.");
    }

    if(!lancamento.valor) {
      erros.push("Informe o valor.");
    }

    if(!lancamento.tipo) {
      erros.push("Informe o tipo.");
    }

    if(erros && erros.length > 0) {
      throw new ErroException(erros);
    }
  }
  
}