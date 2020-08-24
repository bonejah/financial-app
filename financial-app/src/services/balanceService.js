import ApiService from "./apiService";

import ErrorException from "../exceptions/errorException";

export default class BalanceService extends ApiService {

  constructor() {
    super("/api/balances");
  }

  getListMonths() {
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

  getListTypes() {
    return [
      {label: 'Select...', value: ''},
      {label: 'Expense', value: 'EXPENSE'},
      {label: 'Income', value: 'INCOME'}
    ];
  }

  getById(id) {
    return this.get(`/${id}`);
  }

  getBalance(balanceFilter) {
    let params = `?year=${balanceFilter.year}`;

    if (balanceFilter.month) {
      params = `${params}&month=${balanceFilter.month}`;
    }

    if (balanceFilter.type) {
      params = `${params}&type=${balanceFilter.type}`;
    }

    if (balanceFilter.status) {
      params = `${params}&status=${balanceFilter.status}`;
    }

    if (balanceFilter.userId) {
      params = `${params}&userId=${balanceFilter.userId}`;
    }

    if (balanceFilter.description) {
      params = `${params}&description=${balanceFilter.description}`;
    }

    return this.get(params);
  }

  delete(id) {
    return this.delete(`/${id}`);
  }

  save(balance) {
    return this.post("/", balance);
  }

  update(balance) {
    return this.put(`/${balance.id}`, balance);
  }

  updateStatus(id, status) {
    return this.put(`/${id}/update-status`, { status })
  }

  validate(balance) {
    const messages = [];
    
    if(!balance.description) {
      messages.push("Input description.");
    }

    if(!balance.year) {
      messages.push("Input year.");
    }

    if(!balance.month) {
      messages.push("Input month.");
    }

    if(!balance.value) {
      messages.push("Input value.");
    }

    if(!balance.type) {
      messages.push("Input type.");
    }

    if(messages && messages.length > 0) {
      throw new ErrorException(messages);
    }
  }
  
}