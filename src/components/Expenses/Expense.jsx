import { Fragment, useState } from "react";
import Modal from "../Modal";
import ExpenseForm from "./ExpenseForm";
const dayjs = require('dayjs')

const Expense = (props) => {
  const expense = props.expense;
  const [editFormShown, setEditFormShown] = useState(false);

  const showEditForm = () => {
    setEditFormShown(true);
  }

  const hideEditForm = () => {
    setEditFormShown(false);
  }

  const editExpenseHandler = (expenseDate) => {
    const expenseDateWithId = {
      ...expenseDate,
      id: expense.id
    }
    props.editExpense(expenseDateWithId)

    setEditFormShown(false)
  }

  const deleteExpenseHandler = () => {
    props.deleteExpense(expense.id)
  }

  return (
    <Fragment>
      {editFormShown && (
        <Modal onClose={hideEditForm}>
          <ExpenseForm mode="edit" expense={expense} editExpense={editExpenseHandler}/>
        </Modal>
      )}
      <div className="my-2">
        <div className="row">
          <div className="col">
            <h3 className="fw-semibold mb-2 fs-5">{dayjs(expense.date).format("D MMM")}</h3>
            <div>Category: {expense.category}</div>
            <div>Description: {expense.description}</div>
          </div>
          <div className="col d-flex justify-content-end">
            <div className="fs-3 fw-semibold me-3 d-flex align-items-center">${expense.amount.toFixed(2)}</div>
            <div className="d-flex flex-column mx-1">
              <button className="btn btn-warning mb-1" onClick={showEditForm}>Edit</button>
              <button className="btn btn-danger" onClick={deleteExpenseHandler}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Expense;