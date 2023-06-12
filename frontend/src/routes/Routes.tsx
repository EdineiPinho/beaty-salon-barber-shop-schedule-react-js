import { Route, Routes } from "react-router-dom"
import { Login } from "../page/login/Login.tsx"
import { Register } from "../page/register/Register.tsx"
import { Dashboard } from "../page/dashboard/Dahsboard.tsx"
import Schedules from "../Schedules/Schedules.tsx"
import { PrivateRoute } from "./PrivateRoute.tsx"
import EditProfile from "../page/editProfile/EditProfile.tsx"

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
        <PrivateRoute><Dashboard /></PrivateRoute>
      } />
      <Route path='/schedules' element={
        <PrivateRoute><Schedules /></PrivateRoute>
      } />
      <Route path='/edit-profile' element={
        <PrivateRoute><EditProfile /></PrivateRoute>
      } />
    </Routes>
  )
}