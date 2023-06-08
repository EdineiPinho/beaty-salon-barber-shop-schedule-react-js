import { Route, Routes } from "react-router-dom"
import { Login } from "../page/login/Login.tsx"
import { Register } from "../page/register/Register.tsx"
import { Dashboard } from "../page/dashboard/Dahsboard.tsx"

export const RouteApp = () => {
  return (
    <Routes>
      <Route path='/' element={
        <Login />
      } />
      <Route path='/register' element={
        <Register />
      } />
      <Route path='/dashboard' element={
        <Dashboard />
      } />
    </Routes>
  )
}