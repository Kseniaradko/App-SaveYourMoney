import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    entities: null,
    pageEntity: null,
    totalPages: null,
    error: null,
    isLoading: false
}

const chartsSlice = createSlice({
    name: 'charts',
    initialState,
    reducers: {}
})

const {reducer: chartsReducer, actions} = chartsSlice

const {} = actions

