import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import OperationsHistoryPage from "../../pages/OperationsHistoryPage";
import Footer from "../../components/Footer";
import AuthNavBar from "./AuthNavBar";
import UserPage from "../../pages/UserPage";
import IncomesPage from "../../pages/IncomesPage";
import ExpensesPage from "../../pages/ExpensesPage";
import AccountsPage from "../../pages/AccountsPage";

const AuthMainPage = () => {
    return (
        <>
            <AuthNavBar/>
            <Switch>
                <Route path="/dashboard" exact component={Dashboard}/>
                <Route path='/history' exact component={OperationsHistoryPage}/>
                <Route path='/user' exact component={UserPage}/>
                <Route path='/incomesPage' exact component={IncomesPage}/>
                <Route path='/expensesPage' exact component={ExpensesPage}/>
                <Route path='/accountsPage' exact component={AccountsPage}/>
                <Redirect to='/dashboard'/>
            </Switch>
            <Footer/>
        </>
    )
}

export default AuthMainPage