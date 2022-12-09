import React, {useEffect} from "react";
import LoginPage from "../../pages/LoginPage";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import MainPage from "../../pages/MainPage";
import SignupPage from "../../pages/SignupPage";
import Footer from "../../components/Footer";
import NonAuthNavBar from "./NonAuthNavBar";
import {useDispatch, useSelector} from "react-redux";
import {getIsLoggedIn, loadUsersList} from "../../store/users";
import {loadAccountsList} from "../../store/accounts";
import {loadIncomesList} from "../../store/incomes";
import {loadExpensesList} from "../../store/expenses";

const AuthContainer = withRouter(({children}) => {
    const isLoggedIn = useSelector(getIsLoggedIn())
    const dispatch = useDispatch()

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadUsersList())
            dispatch(loadAccountsList())
            dispatch(loadIncomesList())
            dispatch(loadExpensesList())
        }
    }, [isLoggedIn])

    if (isLoggedIn) return children
    return (
        <>
            <NonAuthNavBar/>
            <Switch>
                <Route path="/" exact component={MainPage}/>
                <Route path="/login" exact component={LoginPage}/>
                <Route path='/signup' exact component={SignupPage}/>
                <Redirect to='/login'/>
            </Switch>
            <Footer/>
        </>
    )
})

export default AuthContainer