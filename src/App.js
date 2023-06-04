import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root'
import ErrorPage from './pages/ErrorPage'
import SignInPage, { action as signInAction } from './pages/SignInPage';
import ExpensesPage from './pages/ExpensesPage';
import RegisterPage, { action as registerAction } from './pages/RegisterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { 
        index: true, 
        element: <Navigate to='/expenses' replace /> 
      },
      { 
        path: 'signin',
        element: <SignInPage />,
        action: signInAction
      },
      { 
        path: 'register',
        element: <RegisterPage /> ,
        action: registerAction
      },
      {
        path: 'expenses',
        element: <ExpensesPage />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
