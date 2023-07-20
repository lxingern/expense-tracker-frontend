import { NavLink, redirect } from "react-router-dom"
import RegisterForm from "../components/Auth/RegisterForm"
import './AuthPages.css'

const RegisterPage = () => {
  return (
    <div className="auth-form-container mx-auto d-flex flex-column">
        <h1 className="text-center fs-1 fw-bold my-5">Register</h1>
        <RegisterForm />
        <NavLink to="/signin" className="btn btn-secondary mt-4">Already have an account? Click to sign in.</NavLink>
    </div>
  )
}

export default RegisterPage

export async function action({request}) {
  const data = await request.formData()
  const authData = {
    name: data.get('name'),
    email: data.get('email'),
    password: data.get('password')
  }

  const response = await fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:8080/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(authData)
  })

  if (response.status === 400) {
    return response
  }

  const resData = await response.json()
  const token = resData.token
  localStorage.setItem('token', token)

  return redirect('/expenses')
}