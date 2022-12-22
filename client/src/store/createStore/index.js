import {combineReducers, configureStore} from "@reduxjs/toolkit";
import usersReducer from "../users";
import incomesReducer from "../incomes";
import expensesReducer from "../expenses";
import accountsReducer from "../accounts";
import operationsHistoryReducer from "../operationsHistory";
import incomesTypeReducer from "../incomesType";
import expensesTypeReducer from "../expensesType";
import chartsReducer from "../charts";
import notesReducer from "../notes";


const rootReducer = combineReducers({
    users: usersReducer,
    incomes: incomesReducer,
    expenses: expensesReducer,
    accounts: accountsReducer,
    operationsHistory: operationsHistoryReducer,
    incomesType: incomesTypeReducer,
    expensesType: expensesTypeReducer,
    charts: chartsReducer,
    notes: notesReducer
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}