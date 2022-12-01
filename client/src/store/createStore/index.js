import {combineReducers, configureStore} from "@reduxjs/toolkit";
import usersReducer from "../users";
import incomesReducer from "../incomes";
import expensesReducer from "../expenses";
import accountsReducer from "../accounts";


const rootReducer = combineReducers({
    users: usersReducer,
    incomes: incomesReducer,
    expenses: expensesReducer,
    accounts: accountsReducer
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}