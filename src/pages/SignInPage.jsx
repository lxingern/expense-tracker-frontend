import SignInForm from "../components/Auth/SignInForm"
import './AuthPages.css'
import { NavLink, redirect } from "react-router-dom"

const SignInPage = () => {
  return (
    <div className="auth-form-container mx-auto d-flex flex-column">
      <h1 className="text-center fs-1 fw-bold my-5">Sign In</h1>
      <SignInForm />
      <NavLink to="/register" className="btn btn-secondary mt-4">Don't have an account? Click to register.</NavLink>
    </div>
  )
}

export default SignInPage

export async function action({request}) {
  const data = await request.formData()
  const authData = {
    email: data.get('email'),
    password: data.get('password')
  }

  const response = await fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:8080/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(authData)
  })

  if (response.status === 403) {
    return {
      error: 'Invalid email or password.'
    }
  }

  const resData = await response.json()
  const token = resData.token
  localStorage.setItem('token', token)

  return redirect('/expenses')
}