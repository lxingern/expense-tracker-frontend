const Filters = () => {
  return (
    <form className="mt-4">
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="startDate" className="form-label">Start date:</label>
          <input type="date" id="startDate" className="form-control" />
        </div>
        <div className="col">
          <label htmlFor="endDate" className="form-label">End date:</label>
          <input type="date" id="endDate" className="form-control" />
        </div>
      </div>
      <div className="row">
        <label className="form-label">Categories:</label>
        <div className="d-flex">
          <div className="form-check">
            <input type="checkbox" id="Food and Drink" value={"Food and Drink"} className="form-check-input" />
            <label htmlFor="Food and Drink" className="form-check-label me-3">Food and Drink</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="Leisure" value={"Leisure"} className="form-check-input" />
            <label htmlFor="Leisure" className="form-check-label me-3">Leisure</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="Transport" value={"Transport"} className="form-check-input" />
            <label htmlFor="Transport" className="form-check-label me-3">Transport</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="Utilities and Bills" value={"Utilities and Bills"} className="form-check-input" />
            <label htmlFor="Utilities and Bills" className="form-check-label me-3">Utilities and Bills</label>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Filters