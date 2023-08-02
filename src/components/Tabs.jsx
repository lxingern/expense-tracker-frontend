import { Link } from "react-router-dom"

const Tabs = (props) => {
  const selected = props.selected

  return (
    <nav className="d-flex justify-content-evenly mb-3">
      <Link to={"/expenses"} className={`text-decoration-none text-body ${selected === "expenses" ? "disabled-link" : ""}`}>
        <div className={`py-2 px-3 ${selected === "expenses" ? "border-bottom border-secondary border-3" : ""}`}>Expenses</div>
      </Link>
      <Link to={"/budgets"} className={`text-decoration-none text-body ${selected === "budgets" ? "disabled-link" : ""}`}>
        <div className={`py-2 px-3 ${selected === "budgets" ? "border-bottom border-secondary border-3" : ""}`}>Budgets</div>
      </Link>
    </nav>
  )
}

export default Tabs