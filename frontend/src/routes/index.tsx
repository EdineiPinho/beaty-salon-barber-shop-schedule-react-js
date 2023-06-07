import { Route, Routes } from "react-router-dom"
import { Login } from "../page/login/index.tsx"
import { Register } from "../page/register/index.tsx"

export const RouteApp = () => {
  return (
    <Routes>
      <Route path='/' element={
        <Login />
      } />
      <Route path='/register' element={
        <Register />
      } />
    </Routes>
  )
}