import { useNavigate } from "react-router-dom"
import Tabs from "../components/Tabs"

const BudgetsPage = () => {
  const navigate = useNavigate()

  const logoutHandler = async () => {
    localStorage.removeItem('token')
    return navigate('/signin')
  }

  return (
    <>
      <button className="position-absolute top-0 end-0 me-5 btn btn-dark" onClick={logoutHandler}>Log out</button>
      <div className="custom-container mx-auto">
        <h1 className="text-center fs-1 fw-bold my-5">Expense Tracker</h1>
        <Tabs selected={"budgets"} />
      </div>
    </>
  )
}

export default BudgetsPage