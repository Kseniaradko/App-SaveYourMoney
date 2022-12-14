import {createSlice} from "@reduxjs/toolkit";
import history from "../../utils/history";
import authService from "../../services/auth.service";
import localStorageService from "../../services/localStorage.service";
import {generateAuthError} from "../../utils/generateAuthError";
import userService from "../../services/user.service";
import {toast} from "react-toastify";

const initialState = localStorageService.getAccessToken() ? {
    entities: null,
    isLoading: true,
    error: null,
    auth: {userId: localStorageService.getUserId()},
    isLoggedIn: true,
    dataLoaded: false
} : {
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
        userUpdated: (state, action) => {
            state.isLoading = false
            state.entities = state.entities.map((account) => {
                if (account._id === action.payload._id) {
                    return action.payload
                }
                return account
            })
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
        const {code, message} = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(authRequestFailed(errorMessage));
        } else {
            dispatch(authRequestFailed(error.message));
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
        dispatch(authRequestFailed(error.message));
        toast.error('Что-то пошло не так! Попробуйте еще раз немного позже.', {
            position: toast.POSITION.TOP_RIGHT
        })
    }
}

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData()
    dispatch(userLoggedOut())
    history.push('/login')
}

export const updateUser = (data) => async (dispatch) => {
    try {
        const {content} = await userService.update(data)
        console.log('content', content)
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
    return state.users.entities ?
        state.users.entities.find(u => u._id === state.users.auth.userId) : null;
}

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn

export default usersReducer