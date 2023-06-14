import { useRef, useState } from "react"

const Filters = (props) => {
  const defaultStartDate = props.startDate.current
  const defaultEndDate = props.endDate.current
  const defaultCategories = props.categories.current
  const startDateInput = useRef()
  const endDateInput = useRef()
  const foodAndDrinkInput = useRef()
  const leisureInput = useRef()
  const transportInput = useRef()
  const utilitiesAndBillsInput = useRef()
  const categoryInputs = [foodAndDrinkInput, leisureInput, transportInput, utilitiesAndBillsInput]
  const [datesAreValid, setDatesAreValid] = useState(true)

  const changeHandler = (e) => {
    if (Date.parse(startDateInput.current.value) > Date.parse(endDateInput.current.value)) {
      return setDatesAreValid(false)
    }
      
    setDatesAreValid(true)
    
    const categoryFilter = []
    for (const category of categoryInputs) {
      if (category.current.checked) categoryFilter.push(category.current.value)
    }

    const filters = {
      startDate: startDateInput.current.value,
      endDate: endDateInput.current.value,
      categories: categoryFilter
    }

    console.log(filters)
    props.onFilter(filters)
  }

  return (
    <form className="mt-4">
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="startDate" className="form-label">Start date:</label>
          <input type="date" id="startDate" className="form-control" defaultValue={defaultStartDate} ref={startDateInput} onChange={changeHandler}/>
        </div>
        <div className="col">
          <label htmlFor="endDate" className="form-label">End date:</label>
          <input type="date" id="endDate" className="form-control" defaultValue={defaultEndDate} ref={endDateInput} onChange={changeHandler}/>
        </div>
        {!datesAreValid && <span className="text-danger mt-1">Start date must be before end date.</span>}
      </div>
      <div className="row">
        <label className="form-label">Categories:</label>
        <div className="d-flex">
          <div className="form-check">
            <input type="checkbox" id="Food and Drink" value={"Food and Drink"} className="form-check-input" ref={foodAndDrinkInput} defaultChecked={defaultCategories.includes("Food and Drink")} onChange={changeHandler}/>
            <label htmlFor="Food and Drink" className="form-check-label me-3">Food and Drink</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="Leisure" value={"Leisure"} className="form-check-input" ref={leisureInput} defaultChecked={defaultCategories.includes("Leisure")} onChange={changeHandler}/>
            <label htmlFor="Leisure" className="form-check-label me-3">Leisure</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="Transport" value={"Transport"} className="form-check-input" ref={transportInput} defaultChecked={defaultCategories.includes("Transport")} onChange={changeHandler}/>
            <label htmlFor="Transport" className="form-check-label me-3">Transport</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="Utilities and Bills" value={"Utilities and Bills"} className="form-check-input" ref={utilitiesAndBillsInput} defaultChecked={defaultCategories.includes("Utilities and Bills")} onChange={changeHandler}/>
            <label htmlFor="Utilities and Bills" className="form-check-label me-3">Utilities and Bills</label>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Filters