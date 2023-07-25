import { Form, useActionData, useNavigation } from "react-router-dom"
import Spinner from "react-bootstrap/Spinner";

const RegisterForm = () => {
  const data = useActionData()
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting"

  return (
    <Form method="post">
      {data && data.error && <p className="text-danger w-100 text-center">{data.error}</p>}

      <label htmlFor="name" className="form-label">Name</label>
      <input name="name" id="name" type="text" className="form-control mb-3"></input>

      <label htmlFor="email" className="form-label">Email address</label>
      <input name="email" id="email" type="email" className="form-control mb-3"></input>

      <label htmlFor="password" className="form-label">Password</label>
      <input name="password" id="password" type="password" className="form-control mb-3"></input>

      <button className="btn btn-primary" disabled={isSubmitting}>
        { isSubmitting ? "Registering... " : "Register" } 
        { isSubmitting && (
          <Spinner animation="border" role="status" size="sm">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </button>
    </Form>
  )
}

export default RegisterForm