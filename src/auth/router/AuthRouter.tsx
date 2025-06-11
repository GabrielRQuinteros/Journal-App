import { Navigate, Route } from "react-router"
import { AuthLayout } from "../pages/Layout/AuthLayout"
import { LoginPage } from "../pages/Login/LoginPage"
import { RegisterPage } from "../pages/Register/RegisterPage"

export const AuthRouter = () => {
  return (
        <Route path="auth" element={ <AuthLayout/> } >
            <Route path="" element={ <Navigate to='login' replace /> } />
            <Route path="login" element={<LoginPage/>} />
            <Route path="register" element={ <RegisterPage/> } />
            
            <Route path="*" element={ <Navigate to='login' replace /> } />
        </Route>
  );

}
