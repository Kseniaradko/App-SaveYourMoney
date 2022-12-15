import {createSlice} from "@reduxjs/toolkit";
import incomesTypeService from "../../services/incomesType.service";
import {toast} from "react-toastify";
import localStorageService from "../../services/localStorage.service";

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

        },
        incomesTypeCreatedFailed: (state, action) => {

        }
    }
})

const {reducer: incomesTypeReducer, actions} = incomesTypeSlice

const {
    incomesTypeRequested,
    incomesTypeRequestedFailed,
    incomesTypeReceived,
    incomesTypeCreated,
    incomesTypeCreatedFailed
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

export const getIncomesTypes = () => (state) => {
    const currentUserId = localStorageService.getUserId()
    return state.incomesType.entities?.filter((inc) => inc.userId === currentUserId || inc.type === 'default')
}

export default incomesTypeReducer