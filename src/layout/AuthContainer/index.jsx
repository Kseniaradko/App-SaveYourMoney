import React from "react";
import LoginPage, {ACCESS_TOKEN} from "../../pages/LoginPage";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import MainPage from "../../pages/MainPage";
import SignupPage from "../../pages/SignupPage";
import Footer from "../../components/Footer";
import NonAuthNavBar from "./NonAuthNavBar";


const AuthContainer = withRouter(({children}) => {
    const isLoggedIn = localStorage.getItem(ACCESS_TOKEN)

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