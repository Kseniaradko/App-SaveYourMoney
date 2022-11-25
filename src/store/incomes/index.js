import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    entities: null,
    error: null,
    isLoading: false
}

const incomesSlice = createSlice({
    name: 'incomes',
    initialState,
    reducers: {
        incomesRequested: (state) => {
            state.isLoading = true
        },
        incomesRequestedFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        incomesReceived: (state, action) => {
            state.isLoading = false
            state.entities = action.payload
        }
    }
})

const {reducer: incomesReducer, actions} = incomesSlice

const {
    incomesRequested,
    incomesRequestedFailed,
    incomesReceived
} = actions

export const loadIncomesList = () => async (dispatch) => {
    dispatch(incomesRequested())
    try {
        const content = [
            {
                userId: 1,
                id: 1,
                type: 'Зарплата',
                accountId: 1,
                sum: 350000,
                date: new Date().toDateString()
            },
            {
                userId: 1,
                id: 2,
                type: 'Подарок',
                accountId: 2,
                sum: 7600,
                date: new Date().toDateString()
            },
            {
                userId: 1,
                id: 3,
                type: 'Подарок',
                accountId: 2,
                sum: 7600,
                date: new Date().toDateString()
            },
            {
                userId: 1,
                id: 4,
                type: 'Подарок',
                accountId: 2,
                sum: 7600,
                date: new Date().toDateString()
            },
            {
                userId: 1,
                id: 5,
                type: 'Подарок',
                accountId: 2,
                sum: 7600,
                date: new Date().toDateString()
            },
            {
                userId: 2,
                id: 1,
                type: 'Наследство',
                accountId: 2,
                sum: 3900000,
                date: new Date().toDateString()
            },
            {
                userId: 2,
                id: 2,
                type: 'Подарок',
                accountId: 1,
                sum: 1200,
                date: new Date().toDateString()
            },
            {
                userId: 3,
                id: 1,
                type: 'Зарплата',
                accountId: 1,
                sum: 4300000,
                date: new Date().toDateString()
            }, {
                userId: 3,
                id: 2,
                type: 'Зарплата',
                accountId: 1,
                sum: 3400,
                date: new Date().toDateString()
            }
        ]
        dispatch(incomesReceived(content))
    } catch (error) {
        dispatch(incomesRequestedFailed(error.message))
    }
}

export const getCurrentUserIncomes = () => (state) => {
    const currentUserId = Number(localStorage.getItem('id'))
    return state.incomes.entities?.filter((income) => income.userId === currentUserId)
}

export const getIncomesForPlugin = () => (state) => {
    const currentUserId = Number(localStorage.getItem('id'))
    console.log(currentUserId)
    console.log(state.incomes)
    const newState = state.incomes.entities?.filter((income) => income.userId === currentUserId)
    console.log(newState)
    return newState.splice((newState.length - 4), 3)
}

export default incomesReducer