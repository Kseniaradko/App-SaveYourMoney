import React, {useEffect} from "react";
import AuthContainer from "./layout/AuthContainer";
import AuthMainPage from "./layout/AuthMainPage";
import {useDispatch} from "react-redux";
import {loadUsersList} from "./store/users";
import {loadAccountsList} from "./store/accounts";
import {loadIncomesList} from "./store/incomes";
import {loadExpensesList} from "./store/expenses";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUsersList())
        dispatch(loadAccountsList())
        dispatch(loadIncomesList())
        dispatch(loadExpensesList())
    }, [dispatch])

    return (
        <div className='flex flex-col justify-between h-screen'>
            <AuthContainer>
                <AuthMainPage/>
            </AuthContainer>
        </div>
    );
}

export default App;
