import { useNavigate } from "react-router-dom"
import Tabs from "../components/Tabs"
import { useCallback, useEffect, useState } from "react"
import { getAuthToken } from "../util/auth"
import BudgetsList from "../components/Budgets/BudgetsList"

const BudgetsPage = () => {
  const navigate = useNavigate()
  const [budgetsState, setBudgetsState] = useState({})
  const [loaded, setLoaded] = useState(false)

  const loadBudgets = useCallback(async () => {
    if (getAuthToken()) {
      setBudgetsState({ loaded: false, budgets: [] })
      
      const budgetsUrl = `http://${process.env.REACT_APP_API_HOSTNAME}:8080/budgets`
      const response = await fetch(budgetsUrl, {
        headers: {
          'Authorization': 'Bearer ' + getAuthToken()
        }
      })

      if (!response.ok) return navigate('/signin')

      const resData = await response.json()

      setBudgetsState({ loaded: true, budgets: resData })
    } else {
      return navigate('/signin')
    }
  }, [navigate])

  useEffect(() => {
    loadBudgets()
    setLoaded(true)
  }, [loadBudgets])

  const logoutHandler = async () => {
    localStorage.removeItem('token')
    return navigate('/signin')
  }

  let overallBudgets = []
  let categoryBudgets = []
  if (budgetsState.loaded) {
    overallBudgets = budgetsState.budgets.filter((budget => budget.budget.type === "Overall"))
    categoryBudgets = budgetsState.budgets.filter((budget => budget.budget.type === "Category"))
  }

  return (
    <>
      {loaded && 
        <>
          <button className="position-absolute top-0 end-0 me-5 btn btn-dark" onClick={logoutHandler}>Log out</button>
          <div className="custom-container mx-auto">
            <h1 className="text-center fs-1 fw-bold my-5">Expense Tracker</h1>
            <Tabs selected={"budgets"} />
            <h2 className="text-center fs-3 p-3">Overall</h2>
            <BudgetsList budgets={overallBudgets} />
            <h2 className="text-center fs-3 p-3">Categories</h2>
            <BudgetsList budgets={categoryBudgets} />
          </div>
        </>
      }
    </>
  )
}

export default BudgetsPage