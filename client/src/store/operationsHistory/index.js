import {createSlice} from "@reduxjs/toolkit";
import operationsHistoryService from "../../services/operationsHistory.service";
import localStorageService from "../../services/localStorage.service";


const initialState = {
    entities: null,
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
            state.entities = action.payload
        },
        operationCreated: (state, action) => {
            state.entities = [...state.entities, action.payload]
        },
        operationCreatedFailed: (state, action) => {
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

export const loadOperationsList = () => async (dispatch) => {
    dispatch(operationsRequested())
    try {
        const {content} = await operationsHistoryService.get()
        dispatch(operationsReceived(content))
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
    const currentUserId = localStorageService.getUserId()
    return state.operationsHistory.entities.filter((operation) => operation.userId === currentUserId)
}

export default operationsHistoryReducer