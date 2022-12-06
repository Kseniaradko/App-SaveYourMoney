import axios from 'axios'
import configFile from '../config.json'

const http = axios.create({
    baseURL: configFile.apiEndPoint
})

http.interceptors.request.use(
    async function (config) {
        
    }
)