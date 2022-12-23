import React, {useEffect} from 'react'
import LoginPage from '../../pages/LoginPage'
import {Route, Switch, withRouter} from 'react-router-dom'
import MainPage from '../../pages/MainPage'
import SignupPage from '../../pages/SignupPage'
import Footer from '../../components/Footer'
import NonAuthNavBar from './NonAuthNavBar'
import {useDispatch, useSelector} from 'react-redux'
import {getIsLoggedIn, loadUsersList} from '../../store/users'
import localStorageService from '../../services/localStorage.service'

const AuthContainer = withRouter(({children}) => {
    const isLoggedIn = useSelector(getIsLoggedIn())
    const dispatch = useDispatch()
    const token = localStorageService.getAccessToken()

    useEffect(() => {
        if (token) {
            dispatch(loadUsersList())
        }
    }, [dispatch, token])

    if (isLoggedIn && token) return children
    return (
        <>
            <NonAuthNavBar/>
            <Switch>
                <Route path='/' exact component={MainPage}/>
                <Route path='/login' exact component={LoginPage}/>
                <Route path='/signup' exact component={SignupPage}/>
            </Switch>
            <Footer/>
        </>
    )
})

export default AuthContainer