import {createSlice} from "@reduxjs/toolkit";
import localStorageService from "../../services/localStorage.service";
import accountService from "../../services/account.service";
import {toast} from "react-toastify";

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
        },
        accountCreated: (state, action) => {
            state.entities = [...state.entities, action.payload]
        },
        accountCreatedFailed: (state, action) => {
            state.error = action.payload
        },
        accountDeleted: (state, action) => {
            state.entities = state.entities.filter((acc) => acc._id !== action.payload)
        },
        accountDeleteFailed: (state, action) => {
            state.error = action.payload
        },
        accountUpdated: (state, action) => {
            state.isLoading = false
            state.entities = state.entities.map((account) => {
                if (account._id === action.payload._id) {
                    return action.payload
                }
                return account
            })
        },
        accountUpdateFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

const {reducer: accountsReducer, actions} = accountsSlice

const {
    accountsRequested,
    accountsReceived,
    accountsRequestedFailed,
    accountCreated,
    accountCreatedFailed,
    accountDeleted,
    accountDeleteFailed,
    accountUpdated,
    accountUpdateFailed
} = actions

export const loadAccountsList = () => async (dispatch) => {
    dispatch(accountsRequested())
    try {
        const {content} = await accountService.get()
        dispatch(accountsReceived(content))
    } catch (error) {
        dispatch(accountsRequestedFailed(error.message))
    }
}

export const createAccount = (account) => async (dispatch) => {
    try {
        const {content} = await accountService.create(account)
        dispatch(accountCreated(content))
        toast.success('Счет был добавлен!', {
            position: toast.POSITION.TOP_RIGHT
        })
    } catch (error) {
        dispatch(accountCreatedFailed())
    }
}

export const removeAccount = (accountId) => async (dispatch) => {
    try {
        await accountService.removeAccount(accountId)
        dispatch(accountDeleted(accountId))
        toast.success('Счет был удален!', {
            position: toast.POSITION.TOP_RIGHT
        })
    } catch (error) {
        dispatch(accountDeleteFailed(error.message))
    }
}

export const updateAccount = (accountId, data) => async (dispatch) => {
    try {
        const {content} = await accountService.updateAccount(accountId, data)
        dispatch(accountUpdated(content))
        toast.success('Счет был изменен!', {
            position: toast.POSITION.TOP_RIGHT
        })
    } catch (error) {
        dispatch(accountUpdateFailed(error.message))
    }
}

export const getCurrentAccount = (accountId) => (state) => {
    return state.accounts.entities?.find((acc) => acc._id === accountId)
}

export const getCurrentUserAccounts = () => (state) => {
    const currentUserId = localStorageService.getUserId()
    return state.accounts.entities?.filter((acc) => acc.userId === currentUserId)
}

export const getAccountsForPlugin = () => (state) => {
    const currentUserId = localStorageService.getUserId()
    if (state.accounts.entities) {
        const newState = state.accounts.entities?.filter((account) => account.userId === currentUserId)
        if (newState.length > 3) {
            return newState.splice((newState.length - 3), 3).reverse()
        }
        return newState.reverse()
    }
}

export const getAccounts = () => (state) => {
    const currentUserId = localStorageService.getUserId()
    const newState = state.accounts.entities?.filter((account) => account.userId === currentUserId)
    const newArray = []
    if (newState) {
        for (const account of newState) {
            newArray.push({accountName: account.accountName, accountId: account._id})
        }
        return newArray
    }
}

export const getAmountOfAccounts = () => (state) => {
    return state.accounts.entities.length
}

export default accountsReducer