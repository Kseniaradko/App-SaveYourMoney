import {createSlice} from "@reduxjs/toolkit";
import chartsService from "../../services/charts.service";

const initialState = {
    entities: null,
    pageEntity: null,
    error: null,
    isLoading: false
}

const chartsSlice = createSlice({
    name: 'charts',
    initialState,
    reducers: {
        chartsRequested: (state, action) => {
            state.isLoading = true
        },
        chartsRequestedFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        chartsReceived: (state, action) => {
            state.isLoading = false
            state.entities = action.payload
        },
        chartsRec: (state, action) => {
            state.isLoading = false
            state.pageEntity = action.payload.list
            state.totalPages = action.payload.totalPages
        },
    }
})

const {reducer: chartsReducer, actions} = chartsSlice

const {
    chartsRequested,
    chartsRequestedFailed,
    chartsReceived,
    chartsRec
} = actions

export const loadChartsList = () => async (dispatch) => {
    dispatch(chartsRequested())
    try {
        const {content} = await chartsService.get()

        const result = []
        Object.keys(content).forEach((item) => {
            const key = {
                name: item,
                income: content[item].incomes,
                expense: content[item].expenses
            }
            result.push(key)
        })
        console.log(result)
        dispatch(chartsReceived(result))
    } catch (error) {
        dispatch(chartsRequestedFailed())
    }
}

export const getChartsData = () => (state) => {
    return state.charts.entities
}

export const getChartsLoadingStatus = () => (state) => {
    return state.charts.isLoading
}

export default chartsReducer
