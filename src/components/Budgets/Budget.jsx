import * as dayjs from 'dayjs'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'

const Budget = (props) => {
  const budget = props.budget

  const timeframe = budget.budget.timeframe
  let period = ""
  switch (timeframe) {
    case "DAILY":
      period = dayjs().format("ddd, D MMM YYYY")
      break;
    case "WEEKLY":
      const startOfWeek = dayjs(budget.periodStart).format("D MMM YYYY")
      const endOfWeek = dayjs(budget.periodEnd).format("D MMM YYYY")
      period = startOfWeek + " - " + endOfWeek
      break;
    case "MONTHLY":
      period = dayjs().format("MMM YYYY")
      break;
    case "QUARTERLY":
      const startOfQuarter = dayjs(budget.periodStart).format("D MMM YYYY")
      const endOfQuarter = dayjs(budget.periodEnd).format("D MMM YYYY")
      period = startOfQuarter + " - " + endOfQuarter
      break;
    case "YEARLY":
      period = dayjs().format("YYYY")
      break;
    default:
  }

  const deleteHandler = () => {
    props.deleteBudget(budget.budget.id)
  }
  
  return (
    <div className="mb-2 border rounded d-flex justify-content-between p-3 align-items-center">
      <div>
        <div className="d-flex align-items-end mb-2">
          {budget.budget.category && <h3 className="fs-4 mb-0 me-2">{budget.budget.category} |</h3>}
          <h3 className="fs-4 mb-0 me-2">{timeframe}</h3>
          <span className="fst-italic">{period}</span>
        </div>
        <p className="mb-0">${budget.expenditure.toFixed(2)} out of ${budget.budget.amount.toFixed(2)} spent</p>
      </div>
      <div className="d-flex">
        <div className="fs-1 me-3">
          {budget.utilization.toFixed(1)}%
        </div>
        <div className="d-flex flex-column justify-content-center">
          <button className="btn fs-6 p-0 text-warning"><FiEdit className="" /></button>
          <button className="btn fs-6 p-0 text-danger" onClick={deleteHandler}><RiDeleteBinLine /></button>
        </div>
      </div>
      
    </div>
  )
}

export default Budget