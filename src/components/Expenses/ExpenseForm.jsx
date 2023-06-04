import { useRef } from "react";

const ExpenseForm = (props) => {
  const amountRef = useRef()
  const categoryRef = useRef()
  const dateRef = useRef()
  const descriptionRef = useRef()
  let currAmount = "", currCategory = "", currDate = "", currDescription = ""

  if (props.mode === "edit") {
    currAmount = props.expense.amount;
    currCategory = props.expense.category;
    currDate = props.expense.date;
    currDescription = props.expense.description;
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const expenseData = {
      amount: amountRef.current.value,
      category: categoryRef.current.value,
      date: dateRef.current.value,
      description: descriptionRef.current.value
    }

    if (props.mode === "new") {
      props.createExpense(expenseData)
    } else if (props.mode === "edit") {
      props.editExpense(expenseData)
    }

    amountRef.current.value = ""
    categoryRef.current.value = ""
    dateRef.current.value = ""
    descriptionRef.current.value = ""
  }

  return (
    <form className="mb-2" onSubmit={submitHandler}>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input name="amount" id="amount" type="number" step="0.01" className="form-control" defaultValue={currAmount} ref={amountRef} />
        </div>

        <div className="col">
          <label htmlFor="category" className="form-label">Category</label>
          <select name="category" id="category" className="form-select" ref={categoryRef} defaultValue={currCategory}>
            <option value="Food and Drink">Food and Drink</option>
            <option value="Leisure">Leisure</option>
            <option value="Transport">Transport</option>
            <option value="Utilities and Bills">Utilities and Bills</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="date" className="form-label">Date</label>
          <input name="date" id="date" type="date" className="form-control" ref={dateRef} defaultValue={currDate} />
        </div>

        <div className="col">
          <label htmlFor="description" className="form-label">Description</label>
          <input name="description" type="text" className="form-control" ref={descriptionRef} defaultValue={currDescription} />
        </div>
      </div>

      {props.mode === "new" ? <button className="btn btn-primary">Add New Expense</button> : <button className="btn btn-primary">Edit Expense</button>}
      
    </form>
  )
}

export default ExpenseForm;