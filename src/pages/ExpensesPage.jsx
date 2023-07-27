import './ExpensesPage.css'
import ExpenseForm from '../components/Expenses/ExpenseForm';
import ExpenseList from '../components/Expenses/ExpensesList';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getAuthToken } from '../util/auth';
import { useNavigate } from 'react-router-dom';
import Filters from '../components/Expenses/Filters';

const ExpensesPage = () => {
  const navigate = useNavigate()
  const [expenses, setExpenses] = useState([])
  const [totalExpenses, setTotalExpenses] = useState(0)
  const startDate = useRef()
  const endDate = useRef()
  const categories = useRef()
  const [loaded, setLoaded] = useState(false)
  const [expensesLoaded, setExpensesLoaded] = useState(false)

  const loadExpenses = useCallback(async () => {
    if (getAuthToken()) {
      setExpensesLoaded(false)
      let url = `http://${process.env.REACT_APP_API_HOSTNAME}:8080/expenses?`
      const queryParams = []
      if (startDate.current && endDate.current) {
        queryParams.push('startDate=' + startDate.current)
        queryParams.push('endDate=' + endDate.current)
      }
      if (categories.current) {
        queryParams.push('categories=' + categories.current.join())
      }
      if (queryParams.length > 0) {
        url = url + queryParams.join('&')
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': 'Bearer ' + getAuthToken()
        }
      })

      if (!response.ok) return navigate('/signin')

      const resData = await response.json()

      setExpenses(resData.expenses)
      setTotalExpenses(resData.totalAmount)

      startDate.current = resData.startDate
      endDate.current = resData.endDate
      categories.current = resData.categories

      setExpensesLoaded(true)
      setLoaded(true)
    } else {
      return navigate('/signin')
    }
  }, [navigate])
  
  useEffect(() => {
    loadExpenses()
  }, [loadExpenses])

  const createExpenseHandler = async (expenseData) => {
    await fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:8080/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getAuthToken()
      }, 
      body: JSON.stringify(expenseData)
    })

    await loadExpenses()
  }

  const editExpenseHandler = async (expenseData) => {
    await fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:8080/expenses/${expenseData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getAuthToken()
      }, 
      body: JSON.stringify(expenseData)
    })

    await loadExpenses()
  }

  const deleteExpenseHandler = async (expenseId) => {
    await fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:8080/expenses/${expenseId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + getAuthToken()
      }
    })

    await loadExpenses()
  }

  const logoutHandler = async () => {
    localStorage.removeItem('token')
    return navigate('/signin')
  }

  const filterHandler = async (filters) => {
    startDate.current = filters.startDate
    endDate.current = filters.endDate
    categories.current = filters.categories

    await loadExpenses()
  }

  return (
    <>
      {loaded &&
        <>
          <button className="position-absolute top-0 end-0 me-5 btn btn-dark" onClick={logoutHandler}>Log out</button>
          <div className="custom-container mx-auto">
            <h1 className="text-center fs-1 fw-bold my-5">Expense Tracker</h1>
            <ExpenseForm mode="new" createExpense={createExpenseHandler} />
            <Filters startDate={startDate} endDate={endDate} categories={categories} onFilter={filterHandler} />
            <div className="fs-3 fw-semibold mt-4 mb-3">Total Expenses: ${totalExpenses.toFixed(2)}</div>
            <ExpenseList expenses={expenses} editExpense={editExpenseHandler} deleteExpense={deleteExpenseHandler} loaded={expensesLoaded} />
          </div>
        </>
      }
    </>
  )
}

export default ExpensesPage
