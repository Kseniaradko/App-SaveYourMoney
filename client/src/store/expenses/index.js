import {createSlice} from "@reduxjs/toolkit";
import localStorageService from "../../services/localStorage.service";
import expenseService from "../../services/expense.service";
import {loadAccountsList} from "../accounts";
import {toast} from "react-toastify";

const initialState = {
    entities: null,
    error: null,
    isLoading: false
}

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        expensesRequested: (state) => {
            state.isLoading = true
        },
        expensesRequestedFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        expensesReceived: (state, action) => {
            state.isLoading = false
            state.entities = action.payload
        },
        expenseCreated: (state, action) => {
            state.entities = [...state.entities, action.payload]
        },
        expenseCreatedFailed: (state, action) => {
            state.error = action.payload
        },
        expenseDeleted: (state, action) => {
            state.entities = state.entities.filter((expense) => expense._id !== action.payload)
        },
        expenseDeleteFailed: (state, action) => {
            state.error = action.payload
        },
        expenseUpdated: (state, action) => {
            state.isLoading = false
            state.entities = state.entities.map((expense) => {
                if (expense._id === action.payload._id) {
                    return action.payload
                }
                return expense
            })
        },
        expenseUpdateFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

const {reducer: expensesReducer, actions} = expensesSlice

const {
    expensesRequested,
    expensesRequestedFailed,
    expensesReceived,
    expenseCreated,
    expenseCreatedFailed,
    expenseDeleted,
    expenseDeleteFailed,
    expenseUpdated,
    expenseUpdateFailed
} = actions

export const loadExpensesList = () => async (dispatch) => {
    dispatch(expensesRequested())
    try {
        const {content} = await expenseService.get()
        dispatch(expensesReceived(content))
    } catch (error) {
        dispatch(expensesRequestedFailed(error.message))
    }
}

export const createExpense = (expense) => async (dispatch) => {
    try {
        const {content} = await expenseService.create(expense)
        dispatch(expenseCreated(content))
        dispatch(loadAccountsList())
    } catch (error) {
        dispatch(expenseCreatedFailed(error.message))
    }
}

export const removeExpense = (expenseId) => async (dispatch) => {
    try {
        await expenseService.removeExpense(expenseId)
        dispatch(expenseDeleted(expenseId))
        dispatch(loadAccountsList())
        toast.error('Расход был удален!', {
            position: toast.POSITION.TOP_RIGHT
        })
    } catch (error) {
        dispatch(expenseDeleteFailed(error.message))
    }
}

export const updateExpense = (expenseId, data) => async (dispatch) => {
    try {
        const {content} = await expenseService.updateExpense(expenseId, data)
        dispatch(expenseUpdated(content))
        dispatch(loadAccountsList())
        toast.success('Расход был изменен!', {
            position: toast.POSITION.TOP_RIGHT
        })
    } catch (error) {
        dispatch(expenseUpdateFailed(error.message))
    }
}

export const getCurrentUserExpenses = () => (state) => {
    const currentUserId = localStorageService.getUserId()
    return state.expenses.entities?.filter((exp) => exp.userId === currentUserId)
}

export const getExpensesForPlugin = () => (state) => {
    const currentUserId = localStorageService.getUserId()
    if (state.expenses.entities) {
        const newState = state.expenses.entities?.filter((expense) => expense.userId === currentUserId)
        if (newState.length > 3) {
            const showedElements = newState.splice((newState.length - 3), 3).reverse()
            return showedElements
        }
        return newState.reverse()
    }
    return
}

export const getExpenseById = (id) => (state) => {
    return state.expenses.entities?.find((expense) => expense._id === id)
}


export default expensesReducer