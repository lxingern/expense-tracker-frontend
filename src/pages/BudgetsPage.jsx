import { useNavigate } from "react-router-dom"
import Tabs from "../components/Tabs"
import { useCallback, useEffect, useState } from "react"
import { getAuthToken } from "../util/auth"
import BudgetsList from "../components/Budgets/BudgetsList"
import BudgetForm from "../components/Budgets/BudgetForm"

const BudgetsPage = () => {
  const navigate = useNavigate()
  const [budgetsState, setBudgetsState] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [budgetForm, setBudgetForm] = useState({ showForm: false, errorMsg: "" })

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

  const deleteBudget = async (budgetId) => {
    await fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:8080/budgets/${budgetId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + getAuthToken()
      }
    })

    setBudgetsState((prevState) => {
      return {
        ...prevState,
        budgets: prevState.budgets.filter(budget => budget.budget.id !== budgetId)
      }
    })
  }

  const createBudget = async (data) => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:8080/budgets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getAuthToken()
      }, 
      body: JSON.stringify(data)
    })

    if (response.ok) {
      setBudgetForm({ showForm: false, errorMsg: "" })
      loadBudgets()
    } else {
      setBudgetForm((prev) => {
        return {
          showForm: prev.showForm,
          errorMsg: "That budget already exists!"
        }
      })
    }
  }

  const showBudgetForm = () => {
    setBudgetForm((prev) => {
      return {
        showForm: true,
        errorMsg: prev.errorMsg
      }
    })
  }

  return (
    <>
      {loaded && 
        <>
          <button className="position-absolute top-0 end-0 me-5 btn btn-dark" onClick={logoutHandler}>Log out</button>
          <div className="custom-container mx-auto">
            <h1 className="text-center fs-1 fw-bold my-5">Expense Tracker</h1>
            <Tabs selected={"budgets"} />
            {!budgetForm.showForm && <button type="button" class="btn btn-outline-primary mx-auto d-block" onClick={showBudgetForm}>+ Add new budget</button>}
            {budgetForm.showForm && <BudgetForm createBudget={createBudget} errorMsg={budgetForm.errorMsg} />}
            <h2 className="text-center fs-3 p-3">Overall</h2>
            <BudgetsList budgets={overallBudgets} deleteBudget={deleteBudget} />
            <h2 className="text-center fs-3 p-3">Categories</h2>
            <BudgetsList budgets={categoryBudgets} deleteBudget={deleteBudget} />
          </div>
        </>
      }
    </>
  )
}

export default BudgetsPage