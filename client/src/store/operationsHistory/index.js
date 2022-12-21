import {createSlice} from "@reduxjs/toolkit";
import operationsHistoryService from "../../services/operationsHistory.service";

const initialState = {
    entities: null,
    totalPages: null,
    error: null,
    isLoading: false
}

const operationsHistorySlice = createSlice({
    name: 'operationsHistory',
    initialState,
    reducers: {
        operationsRequested: (state) => {
            state.isLoading = true
        },
        operationsRequestedFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        operationsReceived: (state, action) => {
            state.isLoading = false
            state.entities = action.payload.list
            state.totalPages = action.payload.totalPages
        },
        operationCreated: (state, action) => {
            state.isLoading = false
            state.entities = [...state.entities, action.payload]
        },
        operationCreatedFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

const {reducer: operationsHistoryReducer, actions} = operationsHistorySlice
const {
    operationsRequested,
    operationsRequestedFailed,
    operationsReceived,
    operationCreated,
    operationCreatedFailed
} = actions

export const loadOperationsList = (offset, limit, filter) => async (dispatch) => {
    dispatch(operationsRequested())
    try {
        const {content} = await operationsHistoryService.get(offset, limit, filter)
        dispatch(operationsReceived(content))
        return content
    } catch (error) {
        dispatch(operationsRequestedFailed(error.message))
    }
}

export const createOperation = (operation) => async (dispatch) => {
    try {
        const {content} = await operationsHistoryService.create(operation)
        dispatch(operationCreated(content))
    } catch (error) {
        dispatch(operationCreatedFailed(error.message))
    }
}

export const getUserOperations = () => (state) => {
    const entities = state.operationsHistory.entities ? [...state.operationsHistory.entities] : null
    if (entities) return entities
}

export const getTotalOperationsPages = () => (state) => {
    return state.operationsHistory.totalPages
}

export const getOperationsLoadingStatus = () => (state) => {
    return state.operationsHistory.isLoading
}

export default operationsHistoryReducer