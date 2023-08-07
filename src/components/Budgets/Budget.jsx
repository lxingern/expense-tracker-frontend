import * as dayjs from 'dayjs'

const Budget = (props) => {
  const budget = props.budget

  const timeframe = budget.timeframe
  let period = ""
  switch (timeframe) {
    case "DAILY":
      period = dayjs().format("ddd, D MMM YYYY")
      break;
    case "WEEKLY":
      const dayOfWeek = dayjs().day()
      const startOfWeek = dayjs().subtract(dayOfWeek, "day").format("D MMM YYYY")
      const endOfWeek = dayjs().add(6 - dayOfWeek, "day").format("D MMM YYYY")
      period = startOfWeek + " - " + endOfWeek
      break;
    case "MONTHLY":
      period = dayjs().format("MMM YYYY")
      break;
    case "QUARTERLY":
      const month = dayjs().month()
      const year = dayjs().year()
      if (month >= 0 && month <= 2) {
        period = "1 Jan " + year + " - 31 Mar " + year
      } else if (month >= 3 && month <= 5) {
        period = "1 Apr " + year + " - 30 Jun " + year
      } else if (month >= 6 && month <= 8) {
        period = "1 Jul " + year + " - 30 Sep " + year
      } else {
        period = "1 Oct " + year + " - 31 Dec " + year
      }
      break;
    case "YEARLY":
      period = dayjs().format("YYYY")
      break;
    default:
  }
  
  return (
    <div className="mb-2 border rounded d-flex justify-content-between p-3 align-items-center">
      <div>
        <div className="d-flex align-items-end mb-2">
          <h3 className="fs-4 mb-0 me-2">{timeframe}</h3>
          <span className="fst-italic">{period}</span>
        </div>
        {budget.category && <h4 className="fs-4">{budget.category}</h4>}
        <p className="mb-0">?? out of ${budget.amount.toFixed(2)} spent</p>
      </div>
      <div className="fs-1">
        50%
      </div>
    </div>
  )
}

export default Budget