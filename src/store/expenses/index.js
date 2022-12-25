import {createSlice} from '@reduxjs/toolkit'
import expenseService from '../../services/expense.service'
import {loadAccounts, loadAccountsList} from '../accounts'
import {toast} from 'react-toastify'
import {loadChartsList} from '../charts'

const initialState = {
    entities: null,
    pageEntity: null,
    totalPages: null,
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
            state.entities = action.payload.list
            state.totalPages = action.payload.totalPages
        },
        expensesRec: (state, action) => {
            state.isLoading = false
            state.pageEntity = action.payload.list
            state.totalPages = action.payload.totalPages
        },
        expenseCreated: (state, action) => {
            state.isLoading = false
            state.entities = [action.payload, ...state.entities]
        },
        expenseCreatedFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        expenseDeleted: (state, action) => {
            state.isLoading = false
            state.entities = state.entities.filter((expense) => expense._id !== action.payload)
            state.pageEntity = state.pageEntity.filter((expense) => expense._id !== action.payload)
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
            state.pageEntity = state.pageEntity.map((expense) => {
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
    expenseUpdateFailed,
    expensesRec
} = actions

export const loadExpensesList = (offset, limit, filter) => async (dispatch) => {
    dispatch(expensesRequested())
    try {
        const {content} = await expenseService.get(offset, limit, filter)
        dispatch(expensesRec(content))
    } catch (error) {
        dispatch(expensesRequestedFailed(error.message))
    }
}

export const loadExpenses = () => async (dispatch) => {
    dispatch(expensesRequested())
    try {
        const {content} = await expenseService.get()
        dispatch(expensesReceived(content))
    } catch (error) {
        dispatch(expensesRequestedFailed(error.message))
    }
}

export const createExpense = (expense) => async (dispatch) => {
    dispatch(expensesRequested())
    try {
        const {content} = await expenseService.create(expense)
        dispatch(expenseCreated(content))
        dispatch(loadAccounts())
        toast.success('Расход был добавлен!', {
            position: toast.POSITION.TOP_RIGHT
        })
        dispatch(loadChartsList())
    } catch (error) {
        dispatch(expenseCreatedFailed(error.message))
        toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT
        })
    }
}

export const removeExpense = (expenseId, currentPage) => async (dispatch) => {
    dispatch(expensesRequested())
    try {
        await expenseService.removeExpense(expenseId)
        dispatch(expenseDeleted(expenseId))
        dispatch(loadAccountsList())
        toast.error('Расход был удален!', {
            position: toast.POSITION.TOP_RIGHT
        })

        dispatch(loadExpensesList((currentPage - 1) * 5, 5))
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
    const entities = state.expenses.pageEntity ? [...state.expenses.pageEntity] : null
    if (entities) return entities
}

export const getExpensesForPlugin = () => (state) => {
    const entities = state.expenses.entities ? [...state.expenses.entities] : null
    if (entities) {
        if (entities.length > 3) {
            return entities.splice(0, 3)
        }
        return entities
    }
}

export const getExpenseById = (id) => (state) => {
    return state.expenses.pageEntity?.find((expense) => expense._id === id)
}

export const getTotalExpensePages = () => (state) => {
    return state.expenses.totalPages
}

export const getExpenseLoadingStatus = () => (state) => {
    return state.expenses.isLoading
}

export default expensesReducer
