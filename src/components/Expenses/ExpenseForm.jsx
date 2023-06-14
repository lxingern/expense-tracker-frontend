import { useEffect, useRef, useState } from "react";

const ExpenseForm = (props) => {
  const amountRef = useRef()
  const categoryRef = useRef()
  const dateRef = useRef()
  const descriptionRef = useRef()
  let currAmount = "", currCategory = "", currDate = "", currDescription = ""
  const [amountIsValid, setAmountIsValid] = useState(true)
  const [dateIsValid, setDateIsValid] = useState(true)
  let formIsValid = amountIsValid && dateIsValid
  let formSubmitted = useRef(false)

  if (props.mode === "edit") {
    currAmount = props.expense.amount;
    currCategory = props.expense.category;
    currDate = props.expense.date;
    currDescription = props.expense.description;
  }

  useEffect(() => {
    if (formSubmitted.current & formIsValid) {
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
    formSubmitted.current = false
  }, [formSubmitted, formIsValid])

  const submitHandler = (e) => {
    e.preventDefault()
    formSubmitted.current = true

    if (amountRef.current.value.length === 0 || +amountRef.current.value < 0) {
      setAmountIsValid(false)
    } else {
      setAmountIsValid(true)
    }

    if (dateRef.current.value.length === 0) {
      setDateIsValid(false)
    } else {
      setDateIsValid(true)
    }
  }

  return (
    <form className="p-3 bg-body-secondary" onSubmit={submitHandler}>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input name="amount" id="amount" type="number" step="0.01" className="form-control" defaultValue={currAmount} ref={amountRef} />
          {!amountIsValid && <span className="text-danger">Amount cannot be blank or negative.</span>}
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
          {!dateIsValid && <span className="text-danger">Date cannot be blank.</span>}
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