import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    entities: null,
    error: null,
    isLoading: false
}

const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        accountsRequested: (state) => {
            state.isLoading = true
        },
        accountsReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        accountsRequestedFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

const {reducer: accountsReducer, actions} = accountsSlice

const {
    accountsRequested,
    accountsReceived,
    accountsRequestedFailed
} = actions

export const loadAccountsList = () => async (dispatch) => {
    dispatch(accountsRequested())
    try {
        const content = [
            {
                userId: 1,
                accountId: 1,
                account: 'Счет 1234556',
                sum: 300000,
                date: new Date().toDateString()
            },
            {
                userId: 2,
                accountId: 1,
                account: 'Наличные',
                sum: 50000,
                date: new Date().toDateString()
            },
            {
                userId: 3,
                accountId: 1,
                account: 'Дебетовая карта МИР',
                sum: 50000,
                date: new Date().toDateString()
            },
            {
                userId: 3,
                accountId: 2,
                account: 'Наличные',
                sum: 100000,
                date: new Date().toDateString()
            },
            {
                userId: 2,
                accountId: 2,
                account: 'Дебетовая карта Альфа',
                sum: 200000,
                date: new Date().toDateString()
            },
            {
                userId: 1,
                accountId: 2,
                account: 'Дебетовая карта Tinkoff',
                sum: 123350,
                date: new Date().toDateString()
            },
        ]
        dispatch(accountsReceived(content))
    } catch (error) {
        dispatch(accountsRequestedFailed(error.message))
    }
}

export const getCurrentUserAccounts = () => (state) => {
    const currentUserId = Number(localStorage.getItem('id'))
    return state.accounts.entities?.filter((ac) => ac.userId === currentUserId)
}

export const getAccountsForPlugin = () => (state) => {
    const currentUserId = Number(localStorage.getItem('id'))
    const newState = state.accounts.entities?.filter((income) => income.userId === currentUserId)
    return newState.splice((newState.length - 4), 3)
}

export default accountsReducer