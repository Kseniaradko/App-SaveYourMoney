import {createSlice} from "@reduxjs/toolkit";
import incomesTypeService from "../../services/incomesType.service";
import {toast} from "react-toastify";

const initialState = {
    entities: null,
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
            state.entities = action.payload
        },
        incomesTypeCreated: (state, action) => {
            state.entities = [...state.entities, action.payload]
        },
        incomesTypeCreatedFailed: (state, action) => {
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
        },
        incomeTypeUpdateFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        incomeTypeDeleted: (state, action) => {
            state.entities = state.entities.filter((incomeType) => incomeType._id !== action.payload)
        },
        incomeTypeDeleteFailed: (state, action) => {
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
    incomeTypeDeleteFailed
} = actions

export const loadIncomesTypeList = () => async (dispatch) => {
    dispatch(incomesTypeRequested())
    try {
        const {content} = await incomesTypeService.get()
        dispatch(incomesTypeReceived(content))
    } catch (error) {
        dispatch(incomesTypeRequestedFailed(error.message))
    }
}

export const createIncomeType = (data) => async (dispatch) => {
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

export const removeIncomeType = (incomeTypeId) => async (dispatch) => {
    try {
        await incomesTypeService.remove(incomeTypeId)
        dispatch(incomeTypeDeleted(incomeTypeId))
        toast.error('Категория была удален!', {
            position: toast.POSITION.TOP_RIGHT
        })
    } catch (error) {
        dispatch(incomeTypeDeleteFailed(error.message))
    }
}

export const getIncomesTypes = () => (state) => {
    return state.incomesType.entities || null
}

export const getIncomeTypesWithoutDefault = () => (state) => {
    return state.incomesType.entities?.filter((inc) => inc.type !== 'default' || inc.type === null)
}

export default incomesTypeReducer