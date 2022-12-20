import {createSlice} from "@reduxjs/toolkit";
import expensesTypeService from "../../services/expensesType.service";
import {toast} from "react-toastify";

const initialState = {
    entities: null,
    pageEntity: null,
    totalPages: null,
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
            state.entities = action.payload.list
            state.totalPages = action.payload.totalPages
        },
        expensesTypeRec: (state, action) => {
            state.isLoading = false
            state.pageEntity = action.payload.list
            state.totalPages = action.payload.totalPages
        },
        expensesTypeCreated: (state, action) => {
            state.isLoading = false
            state.entities = [action.payload, ...state.entities]
        },
        expensesTypeCreatedFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        expenseTypeUpdated: (state, action) => {
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
        expenseTypeUpdateFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        expenseTypeDeleted: (state, action) => {
            state.isLoading = false
            state.entities = state.entities.filter((incomeType) => incomeType._id !== action.payload)
            state.pageEntity = state.pageEntity.filter((incomeType) => incomeType._id !== action.payload)
        },
        expenseTypeDeleteFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

const {reducer: expensesTypeReducer, actions} = expensesTypeSlice

const {
    expensesTypeRequested,
    expensesTypeRequestedFailed,
    expensesTypeReceived,
    expensesTypeCreated,
    expensesTypeCreatedFailed,
    expenseTypeUpdated,
    expenseTypeUpdateFailed,
    expenseTypeDeleted,
    expenseTypeDeleteFailed,
    expensesTypeRec
} = actions

export const loadExpensesTypeList = (offset, limit) => async (dispatch) => {
    dispatch(expensesTypeRequested())
    try {
        const {content} = await expensesTypeService.get(offset, limit)
        dispatch(expensesTypeRec(content))
    } catch (error) {
        dispatch(expensesTypeRequestedFailed(error.message))
    }
}

export const loadExpenseType = () => async (dispatch) => {
    dispatch(expensesTypeRequested())
    try {
        const {content} = await expensesTypeService.get()
        dispatch(expensesTypeReceived(content))
    } catch (error) {
        dispatch(expensesTypeRequestedFailed(error.message))
    }
}

export const createExpenseType = (data) => async (dispatch) => {
    dispatch(expensesTypeRequested())
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

export const updateExpenseType = (expenseTypeId, data) => async (dispatch) => {
    dispatch(expensesTypeRequested())
    try {
        const {content} = await expensesTypeService.update(expenseTypeId, data)
        dispatch(expenseTypeUpdated(content))
        toast.success('Категория была изменена!', {
            position: toast.POSITION.TOP_RIGHT
        })
    } catch (error) {
        dispatch(expenseTypeUpdateFailed(error.message))
    }
}

export const removeExpenseType = (expenseTypeId, currentPage) => async (dispatch) => {
    dispatch(expensesTypeRequested())
    try {
        await expensesTypeService.remove(expenseTypeId)
        dispatch(expenseTypeDeleted(expenseTypeId))
        toast.error('Категория была удалена!', {
            position: toast.POSITION.TOP_RIGHT
        })

        dispatch(loadExpensesTypeList((currentPage - 1) * 10, 10))
    } catch (error) {
        dispatch(expenseTypeDeleteFailed(error.message))
    }
}

export const getExpensesTypes = () => (state) => {
    return state.expensesType.entities || null
}

export const getExpensesTypesWithoutDefault = () => (state) => {
    return state.expensesType.pageEntity?.filter((exp) => exp.type !== 'default' || exp.type === null)
}

export const getExpenseTypeLoadingStatus = () => (state) => {
    return state.expensesType.isLoading
}

export const getTotalExpenseTypesPages = () => (state) => {
    return state.expensesType.totalPages
}

export default expensesTypeReducer