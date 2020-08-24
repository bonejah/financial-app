import React from "react";
import formatter from "currency-formatter";

export default props => {
  const rows = props.balances.map(balance => {
    return (
      <tr key={balance.id}>
        <td>{balance.description}</td>
        <td>{ formatter.format(balance.value, { locale: 'pt-BR'})}</td>
        <td>{balance.type}</td>
        <td>{balance.month}</td>
        <td>{balance.status}</td>
        <td>
          <button onClick={e => props.editStatus(balance, "EFFECTIVE")} type="button" className="btn btn-success" title="Effective" disabled={balance.status !== "PENDING"}>
            <i className="pi pi-check"></i>
          </button>
          <button onClick={e => props.editStatus(balance, "CANCELED")} type="button" className="btn btn-warning" title="Cancel" disabled={balance.status !== "PENDING"}>
          <i className="pi pi-times"></i>
          </button>
          <button onClick={e => props.editAction(balance.id)} type="button" className="btn btn-primary" title="Editar">
            <i className="pi pi-pencil"></i>
          </button>
          <button onClick={e => props.deleteAction(balance)} type="button" className="btn btn-danger" title="Deletar">
            <i className="pi pi-trash"></i>
          </button>
        </td>
      </tr>
    )
  });

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Description</th>
          <th scope="col">Value</th>
          <th scope="col">Type</th>
          <th scope="col">Month</th>
          <th scope="col">Situation</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}