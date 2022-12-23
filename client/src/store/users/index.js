import {createSlice} from "@reduxjs/toolkit";
import history from "../../utils/history";
import authService from "../../services/auth.service";
import localStorageService from "../../services/localStorage.service";
import {generateAuthError} from "../../utils/generateAuthError";
import userService from "../../services/user.service";
import {toast} from "react-toastify";

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
            state.isLoading = true
        },
        usersReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
            state.dataLoaded = true
            state.isLoggedIn = true
            state.auth = {userId: action.payload._id}
        },
        usersRequestFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        authRequested: (state) => {
            state.error = null
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload
            state.isLoggedIn = true
        },
        userLoggedOut: (state) => {
            state.entities = null
            state.isLoggedIn = false
            state.auth = null
            state.dataLoaded = false
        },
        userUpdated: (state, action) => {
            state.isLoading = false
            state.entities = action.payload
        },
        userUpdateFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
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
    userLoggedOut,
    userUpdated,
    userUpdateFailed
} = actions

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested())
    try {
        const {content} = await userService.get()
        dispatch(usersReceived(content))
    } catch (error) {
        history.push('/login')
        dispatch(usersRequestFailed(error.message))
    }
}

export const logIn = (payload) => async (dispatch) => {
    const {email, password} = payload
    dispatch(authRequested())
    try {
        const data = await authService.logIn({email, password})
        localStorageService.setTokens(data)
        dispatch(authRequestSuccess({userId: data.userId}))
        history.push('/dashboard')
    } catch (error) {
        const {code, message} = error.response.data.error
        if (code === 400) {
            const errorMessage = generateAuthError(message)
            dispatch(authRequestFailed(errorMessage))
        } else {
            dispatch(authRequestFailed('Авторизуйтесь'))
        }
    }
}

export const signUp = (payload) => async (dispatch) => {
    dispatch(authRequested())
    try {
        const data = await authService.register(payload)
        localStorageService.setTokens(data)
        dispatch(authRequestSuccess({userId: data.userId}))
        history.push('/dashboard')
    } catch (error) {
        const {code, message} = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(authRequestFailed(errorMessage));
        } else {
            dispatch(authRequestFailed(error.message));
        }
    }
}

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData()
    dispatch(userLoggedOut())
    history.push('/login')
}

export const updateUser = (data) => async (dispatch) => {
    dispatch(usersRequested())
    try {
        const {content} = await userService.update(data)
        dispatch(userUpdated(content))
        toast.success('Данные были изменены!', {
            position: toast.POSITION.TOP_RIGHT
        })
    } catch (error) {
        dispatch(userUpdateFailed(error.message))
        toast.error('Что-то пошло не так! Попробуйте еще раз немного позже.', {
            position: toast.POSITION.TOP_RIGHT
        })
    }
}


export const getCurrentUserData = () => (state) => {
    return state.users.entities || null
}

export const getDataStatus = () => (state) => state.users.dataLoaded

export const getAuthErrors = () => (state) => state.users.error

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn

export const getUserLoadingStatus = () => (state) => state.users.isLoading

export default usersReducer