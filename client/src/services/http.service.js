import axios from 'axios'
import configFile from '../config.json'
import localStorageService from './localStorage.service'
import authService from './auth.service'
import {toast} from 'react-toastify'

const http = axios.create({
    baseURL: configFile.apiEndPoint
})

http.interceptors.request.use(
    async function (config) {
        const expiresDate = +localStorageService.getTokenExpiresDate()
        const refreshToken = localStorageService.getRefreshToken();
        const isExpired = refreshToken && expiresDate < Date.now();

        if (isExpired) {
            try {
                const data = await authService.refresh()
                localStorageService.setTokens(data)
            } catch (e) {
                if (e.response.status === 401) {
                    localStorageService.removeAuthData()
                    window.location = '/login'
                }
            }
        }
        const accessToken = localStorageService.getAccessToken()
        if (accessToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`
            }
        }
        return config
    }, function (error) {
        console.log(error)
        return Promise.reject(error)
    }
)

http.interceptors.response.use(
    (res) => {
        res.data = {content: res.data}
        return res
    }, function (error) {
        const expectedErrors = error.response &&
            error.response.status >= 400 &&
            error.response.status < 500

        if (
            !expectedErrors
        ) {
            toast.error('Something was wrong. Try it later!')
        }
        return Promise.reject(error)
    }
)

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch
};

export default httpService