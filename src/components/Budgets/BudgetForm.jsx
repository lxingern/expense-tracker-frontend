import { useRef, useState } from "react"

const BudgetForm = (props) => {
  const typeRef = useRef()
  const categoryRef = useRef()
  const timeframeRef = useRef()
  const amountRef = useRef()
  const [showCategory, setShowCategory] = useState(false)
  const [amountIsValid, setAmountIsValid] = useState(true)

  const toggleCategory = (event) => {
    if (event.target.value === "Category") {
      setShowCategory(true)
    } else {
      setShowCategory(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (amountRef.current.value.length === 0 || +amountRef.current.value < 0) {
      setAmountIsValid(false)
      return
    } else {
      setAmountIsValid(true)
    }

    const budgetData = {
      type: typeRef.current.value,
      timeframe: timeframeRef.current.value.toUpperCase(),
      amount: amountRef.current.value
    }

    if (showCategory) budgetData.category = categoryRef.current.value

    props.createBudget(budgetData)

    console.log(budgetData)
    amountRef.current.value = ""
    timeframeRef.current.value = "Daily"
    typeRef.current.value = "Overall"
    setShowCategory(false)
  }

  return (
    <form className="p-3 bg-body-secondary" onSubmit={submitHandler}>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="type" className="form-label">Type</label>
          <select name="type" id="type" className="form-select" onChange={toggleCategory} ref={typeRef}>
            <option value="Overall">Overall</option>
            <option value="Category">Category</option>
          </select>
        </div>

        <div className="col">
          {showCategory && (
            <>
              <label htmlFor="category" className="form-label">Category</label>
              <select name="category" id="category" className="form-select" ref={categoryRef}>
                <option value="Food and Drink">Food and Drink</option>
                <option value="Leisure">Leisure</option>
                <option value="Transport">Transport</option>
                <option value="Utilities and Bills">Utilities and Bills</option>
              </select>
            </>
          )}
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="timeframe" className="form-label">Timeframe</label>
          <select name="timeframe" id="timeframe" className="form-select" ref={timeframeRef}>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
        
        <div className="col">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input name="amount" id="amount" type="number" step="0.01" className="form-control" ref={amountRef} />
          {!amountIsValid && <span className="text-danger">Amount cannot be blank or negative.</span>}
        </div>
      </div>
  
      <div className="d-flex align-items-center">
        <button className="btn btn-primary me-2">Add New Budget</button> <span className="text-danger">{props.errorMsg}</span>
      </div>
    </form>
  )
}

export default BudgetForm