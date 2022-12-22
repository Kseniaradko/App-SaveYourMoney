import {createSlice} from "@reduxjs/toolkit";
import noteService from "../../services/note.service";
import {toast} from "react-toastify";

const initialState = {
    entities: null,
    error: null,
    isLoading: false
}

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        notesRequested: (state) => {
            state.isLoading = true
        },
        notesRequestedFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        notesReceived: (state, action) => {
            state.isLoading = false
            state.entities = action.payload
        },
        noteCreated: (state, action) => {
            state.isLoading = false
            state.entities = [action.payload, ...state.entities]
        },
        noteCreatedFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        noteDeleted: (state, action) => {
            state.isLoading = false
            state.entities = state.entities.filter((income) => income._id !== action.payload)
        },
        noteDeleteFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        noteUpdated: (state, action) => {
            state.isLoading = false
            state.entities = state.entities.map((income) => {
                if (income._id === action.payload._id) {
                    return action.payload
                }
                return income
            })
        },
        noteUpdatedFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

const {reducer: notesReducer, actions} = notesSlice

const {
    noteDeleted,
    noteCreated,
    notesReceived,
    notesRequested,
    noteUpdated,
    notesRequestedFailed,
    noteUpdatedFailed,
    noteCreatedFailed,
    noteDeleteFailed
} = actions

export const loadNotesList = () => async (dispatch) => {
    dispatch(notesRequested())
    try {
        const {content} = await noteService.get()
        dispatch(notesReceived(content))
    } catch (error) {
        dispatch(notesRequestedFailed(error.message))
    }
}

export const createNote = (note) => async (dispatch) => {
    dispatch(notesRequested())
    try {
        const {content} = await noteService.create(note)
        dispatch(noteCreated(content))
        toast.success('Заметка была добавлена!', {
            position: toast.POSITION.TOP_RIGHT
        })
    } catch (error) {
        dispatch(noteCreatedFailed(error.message))
    }
}

export const updateNote = (noteId, note) => async (dispatch) => {
    dispatch(notesRequested())
    console.log('store', note)
    try {
        const {content} = await noteService.update(noteId, note)
        dispatch(noteUpdated(content))
        toast.success('Замтека была изменена!', {
            position: toast.POSITION.TOP_RIGHT
        })
    } catch (error) {
        dispatch(noteUpdatedFailed(error.message))
    }
}

export const removeNote = (noteId) => async (dispatch) => {
    dispatch(notesRequested())
    try {
        await noteService.remove(noteId)
        dispatch(noteDeleted(noteId))
    } catch (error) {
        dispatch(noteDeleteFailed(error.message))
    }
}

export const getUserNotes = () => (state) => {
    return state.notes.entities
}

export const getNotesLoadingStatus = () => (state) => {
    return state.notes.isLoading
}

export default notesReducer