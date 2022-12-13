import {createSlice} from "@reduxjs/toolkit";
import incomeService from "../../services/income.service";
import localStorageService from "../../services/localStorage.service";
import {loadAccountsList} from "../accounts";
import {toast} from "react-toastify";

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
        },
        incomeCreated: (state, action) => {
            state.entities = [...state.entities, action.payload]
        },
        incomeCreatedFailed: (state, action) => {
            state.error = action.payload
        },
        incomeDeleted: (state, action) => {
            state.entities = state.entities.filter((income) => income._id !== action.payload)
        },
        incomeDeleteFailed: (state, action) => {
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
    incomeUpdateFailed
} = actions

export const loadIncomesList = () => async (dispatch) => {
    dispatch(incomesRequested())
    try {
        const {content} = await incomeService.get()
        dispatch(incomesReceived(content))
    } catch (error) {
        dispatch(incomesRequestedFailed(error.message))
    }
}

export const createIncome = (income) => async (dispatch) => {
    try {
        const {content} = await incomeService.create(income)
        dispatch(incomeCreated(content))
        dispatch(loadAccountsList())
        toast.success('Доход был добавлен!', {
            position: toast.POSITION.TOP_RIGHT
        })
    } catch (error) {
        dispatch(incomeCreatedFailed(error.message))
    }
}

export const removeIncome = (incomeId) => async (dispatch) => {
    try {
        await incomeService.removeIncome(incomeId)
        dispatch(incomeDeleted(incomeId))
        dispatch(loadAccountsList())
        toast.error('Доход был удален!', {
            position: toast.POSITION.TOP_RIGHT
        })
    } catch (error) {
        dispatch(incomeDeleteFailed(error.message))
    }
}

export const updateIncome = (incomeId, data) => async (dispatch) => {
    try {
        const {content} = await incomeService.updateIncome(incomeId, data)
        dispatch(incomeUpdated(content))
        dispatch(loadAccountsList())
    } catch (error) {
        dispatch(incomeUpdateFailed(error.message))
    }
}

export const getCurrentUserIncomes = () => (state) => {
    const currentUserId = localStorageService.getUserId()
    return state.incomes.entities?.filter((income) => income.userId === currentUserId)
}

export const getIncomesForPlugin = () => (state) => {
    const currentUserId = localStorageService.getUserId()
    if (state.incomes.entities) {
        const newState = state.incomes.entities?.filter((income) => income.userId === currentUserId)
        if (newState.length > 3) {
            return newState.splice((newState.length - 3), 3).reverse()
        }
        return newState.reverse()
    }
}

export const getIncomeById = (id) => (state) => {
    return state.incomes.entities?.find((income) => income._id === id)
}

export default incomesReducer