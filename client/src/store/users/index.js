import {createSlice, createAction, nanoid} from "@reduxjs/toolkit";
import {ACCESS_TOKEN} from "../../pages/LoginPage";
import history from "../../utils/history";

const initialState = {
    entities: null,
    isLoading: false,
    error: null,
    auth: null,
    isLoggedIn: false,
    dataLoaded: false
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.dataLoaded = true;
        },
        usersRequestFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        authRequested: (state) => {
            state.error = null
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        userLoggedOut: (state) => {
            state.isLoggedIn = false;
            state.auth = null;
        },
    }
})

const {reducer: usersReducer, actions} = usersSlice
const {
    authRequested,
    authRequestFailed,
    authRequestSuccess,
    usersRequested,
    usersReceived,
    usersRequestFailed,
    userLoggedOut
} = actions

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested())
    try {
        const content = [
            {
                id: 1,
                name: 'Ksenia',
                sex: 'female',
                email: 'tester@example.ru',
                password: 'Test1234'
            },
            {
                id: 2,
                name: 'Aleksei',
                sex: 'male',
                email: 'tester2@example.ru',
                password: 'Test1234'
            },
            {
                id: 3,
                name: 'Larisa',
                sex: 'female',
                email: 'tester3@example.ru',
                password: 'Test1234'
            }
        ]
        dispatch(usersReceived(content))
    } catch (error) {
        dispatch(usersRequestFailed(error.message))
    }
}

export const logIn = (payload) => (dispatch, getState) => {
    const {email, password} = payload
    const state = getState()
    const currentUser = state.users.entities.filter((user) => user.email === email && user.password === password)[0]
    dispatch(authRequested())
    if (currentUser) {
        const data = {userId: nanoid()}
        dispatch(authRequestSuccess(data))
        localStorage.setItem(ACCESS_TOKEN, data.userId)
        localStorage.setItem('id', currentUser.id)
        history.push('/dashboard')
    } else {
        history.push('/signUp')
    }
}

export const signUp = (payload) => (dispatch, getState) => {

    dispatch(authRequested())
    const state = getState()
    const currentUser = state.users.entities.filter((user) => user.email === payload.email)[0]
    if (currentUser) return history.push('/login')

    localStorage.setItem(ACCESS_TOKEN, nanoid())
    localStorage.setItem('registerUsers', JSON.stringify(payload))
}

export const logOut = () => (dispatch) => {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem('id')
    dispatch(userLoggedOut())
    history.push('/login')
}

export const getCurrentUserData = () => (state) => {
    const currentUserId = Number(localStorage.getItem('id'))
    return state.users.entities?.find((u) => u.id === currentUserId)
}

export default usersReducer