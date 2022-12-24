import React, { useEffect } from 'react'
import LoginPage from '../../pages/LoginPage'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import MainPage from '../../pages/MainPage'
import SignupPage from '../../pages/SignupPage'
import Footer from '../../components/Footer'
import NonAuthNavBar from './NonAuthNavBar'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUserData, getIsLoggedIn, loadUsersList } from '../../store/users'
import localStorageService from '../../services/localStorage.service'
import Loader from "../../components/common/Loader";

const AuthContainer = withRouter(({ children }) => {
  const isLoggedIn = useSelector(getIsLoggedIn())
  const user = useSelector(getCurrentUserData())
  const dispatch = useDispatch()
  const token = localStorageService.getAccessToken()

  useEffect(() => {
    if (token) {
      dispatch(loadUsersList())
    }
  }, [dispatch, token])

  if (!user && token) return (
    <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
      <Loader/>
    </div>
  )

  if (isLoggedIn && token) return children
  return (
    <>
      <NonAuthNavBar/>
      <Switch>
        <Route path='/' exact component={MainPage}/>
        <Route path='/login' exact component={LoginPage}/>
        <Route path='/signup' exact component={SignupPage}/>
        <Redirect to='/login'/>
      </Switch>
      <Footer/>
    </>
  )
})

export default AuthContainer
