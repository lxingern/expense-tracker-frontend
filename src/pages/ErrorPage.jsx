import { useRouteError } from "react-router-dom"
import './ErrorPage.css'

const ErrorPage = () => {
    const error = useRouteError()

    let title = 'An error occured!'
    let message = 'Something went wrong!'

    if (error.status === 500) {
        message = error.data.message
    }
    if (error.status === 404) {
        title = 'Not found!'
        message = 'Could not find resource or page.'
    }
    return (
      <div className="error-container mx-auto">
        <h1 className="text-center fs-1 fw-bold my-5">{title}</h1>
        <p className="text-center">{message}</p>
      </div>
    )
}

export default ErrorPage