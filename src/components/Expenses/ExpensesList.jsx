import Expense from "./Expense";

const ExpenseList = (props) => {
  const expenses = props.expenses

  return (
    <ul className="list-group">
      {expenses.map(expense => (
        <li key={expense.id} className="list-group-item">
          <Expense expense={expense} editExpense={props.editExpense} deleteExpense={props.deleteExpense}/>
        </li>
      ))}
    </ul>
  )
}

export default ExpenseList;