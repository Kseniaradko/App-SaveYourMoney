import {createSlice} from '@reduxjs/toolkit'
import incomesTypeService from '../../services/incomesType.service'
import {toast} from 'react-toastify'

const initialState = {
    entities: null,
    pageEntity: null,
    totalPages: null,
    error: null,
    isLoading: false
}

const incomesTypeSlice = createSlice({
    name: 'incomesType',
    initialState,
    reducers: {
        incomesTypeRequested: (state, action) => {
            state.isLoading = true
        },
        incomesTypeRequestedFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        incomesTypeReceived: (state, action) => {
            state.isLoading = false
            state.entities = action.payload.list
            state.totalPages = action.payload.totalPages
        },
        incomesTypeRec: (state, action) => {
            state.isLoading = false
            state.pageEntity = action.payload.list
            state.totalPages = action.payload.totalPages
        },
        incomesTypeCreated: (state, action) => {
            state.isLoading = false
            state.entities = [action.payload, ...state.entities]
        },
        incomesTypeCreatedFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        incomeTypeUpdated: (state, action) => {
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
        incomeTypeUpdateFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        incomeTypeDeleted: (state, action) => {
            state.isLoading = false
            state.entities = state.entities.filter((incomeType) => incomeType._id !== action.payload)
            state.pageEntity = state.pageEntity.filter((incomeType) => incomeType._id !== action.payload)
        },
        incomeTypeDeleteFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

const {reducer: incomesTypeReducer, actions} = incomesTypeSlice

const {
    incomesTypeRequested,
    incomesTypeRequestedFailed,
    incomesTypeReceived,
    incomesTypeCreated,
    incomesTypeCreatedFailed,
    incomeTypeUpdated,
    incomeTypeUpdateFailed,
    incomeTypeDeleted,
    incomeTypeDeleteFailed,
    incomesTypeRec
} = actions

export const loadIncomesTypeList = (offset, limit) => async (dispatch) => {
    dispatch(incomesTypeRequested())
    try {
        const {content} = await incomesTypeService.get(offset, limit)
        dispatch(incomesTypeRec(content))
    } catch (error) {
        dispatch(incomesTypeRequestedFailed(error.message))
    }
}

export const loadIncomesType = () => async (dispatch) => {
    dispatch(incomesTypeRequested())
    try {
        const {content} = await incomesTypeService.get()
        dispatch(incomesTypeReceived(content))
    } catch (error) {
        dispatch(incomesTypeRequestedFailed(error.message))
    }
}

export const createIncomeType = (data) => async (dispatch) => {
    dispatch(incomesTypeRequested())
    try {
        const {content} = await incomesTypeService.create(data)
        dispatch(incomesTypeCreated(content))
        toast.success('Категория добавлена', {
            position: toast.POSITION.TOP_RIGHT
        })
    } catch (error) {
        dispatch(incomesTypeCreatedFailed(error.message))
    }
}

export const updateIncomeType = (incomeTypeId, data) => async (dispatch) => {
    dispatch(incomesTypeRequested())
    try {
        const {content} = await incomesTypeService.update(incomeTypeId, data)
        dispatch(incomeTypeUpdated(content))
        toast.success('Категория была изменена!', {
            position: toast.POSITION.TOP_RIGHT
        })
    } catch (error) {
        dispatch(incomeTypeUpdateFailed(error.message))
    }
}

export const removeIncomeType = (incomeTypeId, currentPage) => async (dispatch) => {
    dispatch(incomesTypeRequested())
    try {
        await incomesTypeService.remove(incomeTypeId)
        dispatch(incomeTypeDeleted(incomeTypeId))

        toast.error('Категория была удалена!', {
            position: toast.POSITION.TOP_RIGHT
        })
        dispatch(loadIncomesTypeList((currentPage - 1) * 10, 10))
    } catch (error) {
        dispatch(incomeTypeDeleteFailed(error.message))
    }
}

export const getIncomesTypes = () => (state) => {
    return state.incomesType.entities || null
}

export const getIncomeTypesWithoutDefault = () => (state) => {
    return state.incomesType.pageEntity?.filter((inc) => inc.type !== 'default' || inc.type === null)
}

export const getTotalIncomeTypesPages = () => (state) => {
    return state.incomesType.totalPages
}

export const getIncomeTypeLoadingStatus = () => (state) => {
    return state.incomesType.isLoading
}

export default incomesTypeReducer