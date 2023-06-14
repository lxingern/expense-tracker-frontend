import './ExpensesPage.css'
import ExpenseForm from '../components/Expenses/ExpenseForm';
import ExpenseList from '../components/Expenses/ExpensesList';
import { useCallback, useEffect, useState } from 'react';
import { getAuthToken } from '../util/auth';
import { useNavigate } from 'react-router-dom';
import Filters from '../components/Expenses/Filters';

const ExpensesPage = () => {
  const navigate = useNavigate()
  const [expenses, setExpenses] = useState([])
  const [totalExpenses, setTotalExpenses] = useState(0)
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [categories, setCategories] = useState([])
  const [loaded, setLoaded] = useState(false)

  const loadExpenses = useCallback(async () => {
    if (getAuthToken()) {
      const response = await fetch('http://localhost:8080/expenses', {
        headers: {
          'Authorization': 'Bearer ' + getAuthToken()
        }
      })

      if (!response.ok) return navigate('/signin')

      const resData = await response.json()
      setExpenses(resData.expenses)
      setTotalExpenses(resData.totalAmount)
      setStartDate(resData.startDate)
      setEndDate(resData.endDate)
      setCategories(resData.categories)
      setLoaded(true)
    } else {
      return navigate('/signin')
    }
  }, [navigate])
  
  useEffect(() => {
    loadExpenses()
  }, [loadExpenses])

  const createExpenseHandler = async (expenseData) => {
    await fetch('http://localhost:8080/expenses', {
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
    await fetch(`http://localhost:8080/expenses/${expenseData.id}`, {
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
    await fetch(`http://localhost:8080/expenses/${expenseId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + getAuthToken()
      }
    })

    await loadExpenses()
  }

  const logoutHandler = async () => {
    // await fetch(`http://localhost:8080/logout`, {
    //   headers: {
    //     'Authorization': 'Bearer ' + getAuthToken()
    //   }
    // })

    localStorage.removeItem('token')
    return navigate('/signin')
  }

  return (
    <>
      {loaded && (
        <>
          <button className="position-absolute top-0 end-0 me-5 btn btn-dark" onClick={logoutHandler}>Log out</button>
          <div className="custom-container mx-auto">
            <h1 className="text-center fs-1 fw-bold my-5">Expense Tracker</h1>
            <ExpenseForm mode="new" createExpense={createExpenseHandler} />
            <Filters/>
            {/* startDate={startDate} endDate={endDate} categories={categories} */}
            <div className="fs-3 fw-semibold mt-4 mb-3">Total Expenses: ${totalExpenses.toFixed(2)}</div>
            <ExpenseList expenses={expenses} editExpense={editExpenseHandler} deleteExpense={deleteExpenseHandler} />
          </div>
        </>
      )}
    </>
  )
}

export default ExpensesPage
