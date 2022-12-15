import {combineReducers, configureStore} from "@reduxjs/toolkit";
import usersReducer from "../users";
import incomesReducer from "../incomes";
import expensesReducer from "../expenses";
import accountsReducer from "../accounts";
import operationsHistoryReducer from "../operationsHistory";
import incomesTypeReducer from "../incomesType";
import expensesTypeReducer from "../expensesType";


const rootReducer = combineReducers({
    users: usersReducer,
    incomes: incomesReducer,
    expenses: expensesReducer,
    accounts: accountsReducer,
    operationsHistory: operationsHistoryReducer,
    incomesType: incomesTypeReducer,
    expensesType: expensesTypeReducer
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}