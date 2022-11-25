import {createSlice} from "@reduxjs/toolkit";

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
        }
    }
})

const {reducer: expensesReducer, actions} = expensesSlice

const {
    expensesRequested,
    expensesRequestedFailed,
    expensesReceived
} = actions

export const loadExpensesList = () => (dispatch) => {
    dispatch(expensesRequested())
    try {
        const content = [
            {
                id: 1,
                userId: 1,
                accountId: 1,
                type: 'Развлечение',
                sum: 2000,
                date: new Date().toDateString()
            },
            {
                id: 2,
                userId: 1,
                accountId: 2,
                type: 'Еда',
                sum: 8500,
                date: new Date().toDateString()
            },
            {
                id: 1,
                userId: 2,
                accountId: 2,
                type: 'Подарок',
                sum: 1500,
                date: new Date().toDateString()
            },
            {
                id: 2,
                userId: 2,
                accountId: 1,
                type: 'Лекарства',
                sum: 3000,
                date: new Date().toDateString()
            },
            {
                id: 1,
                userId: 3,
                accountId: 2,
                type: 'Ресторан',
                sum: 4000,
                date: new Date().toDateString()
            },
            {
                id: 2,
                userId: 3,
                accountId: 1,
                type: 'Транспорт',
                sum: 200,
                date: new Date().toDateString()
            }
        ]
        dispatch(expensesReceived(content))
    } catch (error) {
        dispatch(expensesRequestedFailed(error.message))
    }
}

export const getCurrentUserExpenses = () => (state) => {
    const currentUserId = Number(localStorage.getItem('id'))
    return state.expenses.entities?.filter((exp) => exp.userId === currentUserId)
}

export const getExpensesForPlugin = () => (state) => {
    const currentUserId = Number(localStorage.getItem('id'))
    const newState = state.expenses.entities?.filter((income) => income.userId === currentUserId)
    console.log(newState)
    return newState.splice((newState.length - 4), 3)
}


export default expensesReducer