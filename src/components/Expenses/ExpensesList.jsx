import Expense from "./Expense";
import { Spinner } from "react-bootstrap";

const ExpenseList = (props) => {
  const expenses = props.expenses
  const loaded = props.loaded

  return (
    <>
      {loaded && (
        <ul className="list-group">
          {expenses.map(expense => (
            <li key={expense.id} className="list-group-item">
              <Expense expense={expense} editExpense={props.editExpense} deleteExpense={props.deleteExpense}/>
            </li>
          ))}
        </ul>
      )}
      {!loaded && (
        <>
          <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="me-2">Loading... </div>
            <Spinner animation="border" role="status" size="sm" variant="secondary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </>
      )}
    </>
  )
}

export default ExpenseList;