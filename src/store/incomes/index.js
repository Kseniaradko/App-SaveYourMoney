import {createSlice} from '@reduxjs/toolkit'
import incomeService from '../../services/income.service'
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
            state.entities = action.payload.list
            state.totalPages = action.payload.totalPages
        },
        incomesRec: (state, action) => {
            state.isLoading = false
            state.pageEntity = action.payload.list
            state.totalPages = action.payload.totalPages
        },
        incomeCreated: (state, action) => {
            state.isLoading = false
            state.entities = [action.payload, ...state.entities]
        },
        incomeCreatedFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        incomeDeleted: (state, action) => {
            state.isLoading = false
            state.entities = state.entities.filter((income) => income._id !== action.payload)
            state.pageEntity = state.pageEntity.filter((income) => income._id !== action.payload)
        },
        incomeDeleteFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        incomeUpdated: (state, action) => {
            state.isLoading = false
            state.entities = state.entities.map((income) => {
                if (income._id === action.payload._id) {
                    return action.payload
                }
                return income
            })
            state.pageEntity = state.pageEntity.map((income) => {
                if (income._id === action.payload._id) {
                    return action.payload
                }
                return income
            })
        },
        incomeUpdateFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

const {reducer: incomesReducer, actions} = incomesSlice

const {
    incomesRequested,
    incomesRequestedFailed,
    incomesReceived,
    incomeCreated,
    incomeCreatedFailed,
    incomeDeleted,
    incomeDeleteFailed,
    incomeUpdated,
    incomeUpdateFailed,
    incomesRec
} = actions

export const loadIncomesList = (offset, limit, filter) => async (dispatch) => {
    dispatch(incomesRequested())
    try {
        const {content} = await incomeService.get(offset, limit, filter)
        dispatch(incomesRec(content))
    } catch (error) {
        dispatch(incomesRequestedFailed(error.message))
    }
}

export const loadIncomes = () => async (dispatch) => {
    dispatch(incomesRequested())
    try {
        const {content} = await incomeService.get()
        dispatch(incomesReceived(content))
    } catch (error) {
        dispatch(incomesRequestedFailed(error.message))
    }
}


export const createIncome = (income) => async (dispatch) => {
    dispatch(incomesRequested())
    try {
        const {content} = await incomeService.create(income)
        dispatch(incomeCreated(content))

        toast.success('Доход был добавлен!', {
            position: toast.POSITION.TOP_RIGHT
        })
        dispatch(loadAccounts())
        dispatch(loadChartsList())
    } catch (error) {
        dispatch(incomeCreatedFailed(error.message))
    }
}

export const removeIncome = (incomeId, currentPage) => async (dispatch) => {
    dispatch(incomesRequested())
    try {
        await incomeService.removeIncome(incomeId)
        dispatch(incomeDeleted(incomeId))
        dispatch(loadAccountsList())
        toast.error('Доход был удален!', {
            position: toast.POSITION.TOP_RIGHT
        })

        dispatch(loadIncomesList((currentPage - 1) * 5, 5))
    } catch (error) {
        dispatch(incomeDeleteFailed(error.message))
    }
}

export const updateIncome = (incomeId, data) => async (dispatch) => {
    dispatch(incomesRequested())
    try {
        const {content} = await incomeService.updateIncome(incomeId, data)
        dispatch(incomeUpdated(content))
        dispatch(loadAccountsList())
        toast.success('Доход был изменен!', {
            position: toast.POSITION.TOP_RIGHT
        })
    } catch (error) {
        dispatch(incomeUpdateFailed(error.message))
    }
}

export const getCurrentUserIncomes = () => (state) => {
    const entities = state.incomes.pageEntity ? [...state.incomes.pageEntity] : null
    if (entities) return entities
}

export const getIncomesForPlugin = () => (state) => {
    const entities = state.incomes.entities ? [...state.incomes.entities] : null
    if (entities) {
        if (entities.length > 3) {
            return entities.splice(0, 3)
        }
        return entities
    }
}

export const getIncomeById = (id) => (state) => {
    return state.incomes.pageEntity?.find((income) => income._id === id)
}

export const getTotalIncomePages = () => (state) => {
    return state.incomes.totalPages
}

export const getIncomeLoadingStatus = () => (state) => {
    return state.incomes.isLoading
}

export default incomesReducer
