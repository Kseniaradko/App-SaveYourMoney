import {createSlice} from "@reduxjs/toolkit";
import accountService from "../../services/account.service";
import {toast} from "react-toastify";

const initialState = {
    entities: null,
    pageEntity: null,
    totalPages: null,
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
            state.isLoading = false
            state.entities = action.payload.list
            state.totalPages = action.payload.totalPages
        },
        accountsRec: (state, action) => {
            state.isLoading = false
            state.pageEntity = action.payload.list
            state.totalPages = action.payload.totalPages
        },
        accountsRequestedFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        accountCreated: (state, action) => {
            state.isLoading = false
            state.entities = [action.payload, ...state.entities]
        },
        accountCreatedFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        accountDeleted: (state, action) => {
            state.isLoading = false
            state.entities = state.entities.filter((acc) => acc._id !== action.payload)
            state.pageEntity = state.pageEntity.filter((acc) => acc._id !== action.payload)
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
            state.pageEntity = state.pageEntity.map((account) => {
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
    accountUpdateFailed,
    accountsRec
} = actions

export const loadAccountsList = (offset, limit) => async (dispatch) => {
    dispatch(accountsRequested())
    try {
        const {content} = await accountService.get(offset, limit)
        dispatch(accountsRec(content))
    } catch (error) {
        dispatch(accountsRequestedFailed(error.message))
    }
}

export const loadAccounts = () => async (dispatch) => {
    dispatch(accountsRequested())
    try {
        const {content} = await accountService.get()
        dispatch(accountsReceived(content))
    } catch (error) {
        dispatch(accountsRequestedFailed(error.message))
    }
}

export const createAccount = (account) => async (dispatch) => {
    dispatch(accountsRequested())
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

export const removeAccount = (accountId, currentPage) => async (dispatch) => {
    dispatch(accountsRequested())
    try {
        await accountService.removeAccount(accountId)
        dispatch(accountDeleted(accountId))
        toast.success('Счет был удален!', {
            position: toast.POSITION.TOP_RIGHT
        })

        dispatch(loadAccountsList((currentPage - 1) * 6, 6))
    } catch (error) {
        dispatch(accountDeleteFailed(error.message))
    }
}

export const updateAccount = (accountId, data) => async (dispatch) => {
    dispatch(accountsRequested())
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
    return state.accounts.pageEntity?.find((acc) => acc._id === accountId)
}

export const getAccountsForPlugin = () => (state) => {
    const entities = state.accounts.entities ? [...state.accounts.entities] : []
    if (entities) {
        if (entities.length > 3) {
            return entities.splice(0, 3)
        }
        return entities
    }
}

export const getAccounts = () => (state) => {
    const entities = state.accounts.pageEntity ? [...state.accounts.pageEntity] : []
    const newArray = []
    if (entities) {
        for (const account of entities) {
            newArray.push({name: account.accountName, _id: account._id, createdAt: account.createdAt, sum: account.sum})
        }
        return newArray
    }
}

export const getAmountOfAccounts = () => (state) => {
    const entities = state.accounts.entities ? [...state.accounts.entities] : null
    if (entities) return entities.length
}

export const getTotalAccountsPages = () => (state) => {
    return state.accounts.totalPages
}

export const getAccountLoadingStatus = () => (state) => {
    return state.accounts.isLoading
}

export default accountsReducer