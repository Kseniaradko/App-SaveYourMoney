import {createSlice} from "@reduxjs/toolkit";
import expensesTypeService from "../../services/expensesType.service";
import {toast} from "react-toastify";
import localStorageService from "../../services/localStorage.service";

const initialState = {
    entities: null,
    error: null,
    isLoading: false
}

const expensesTypeSlice = createSlice({
    name: 'expensesType',
    initialState,
    reducers: {
        expensesTypeRequested: (state, action) => {
            state.isLoading = true
        },
        expensesTypeRequestedFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        expensesTypeReceived: (state, action) => {
            state.isLoading = false
            state.entities = action.payload
        },
        expensesTypeCreated: (state, action) => {

        },
        expensesTypeCreatedFailed: (state, action) => {

        }
    }
})

const {reducer: expensesTypeReducer, actions} = expensesTypeSlice

const {
    expensesTypeRequested,
    expensesTypeRequestedFailed,
    expensesTypeReceived,
    expensesTypeCreated,
    expensesTypeCreatedFailed
} = actions

export const loadExpensesTypeList = () => async (dispatch) => {
    dispatch(expensesTypeRequested())
    try {
        const {content} = await expensesTypeService.get()
        dispatch(expensesTypeReceived(content))
    } catch (error) {
        dispatch(expensesTypeRequestedFailed(error.message))
    }
}

export const createExpenseType = (data) => async (dispatch) => {
    try {
        const {content} = await expensesTypeService.create(data)
        dispatch(expensesTypeCreated(content))
        toast.success('Категория добавлена', {
            position: toast.POSITION.TOP_RIGHT
        })
    } catch (error) {
        dispatch(expensesTypeCreatedFailed(error.message))
    }
}

export const getExpensesTypes = () => (state) => {
    const currentUserId = localStorageService.getUserId()
    return state.expensesType.entities?.filter((exp) => exp.userId === currentUserId || exp.type === 'default')
}

export default expensesTypeReducer