import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { store } from '~/store/store'

interface Props {
  propName?: string
}

const PrivateRoute: React.FC<Props> = ({ children, ...rest }) => {
  const accessToken = store.getState()?.auth?.accessToken

  return accessToken ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
