import httpService from './http.service'
import localStorageService from './localStorage.service'

const userEndPoint = '/user/'

const userService = {
    get: async () => {
        const {data} = await httpService.get(userEndPoint)
        return data
    },
    update: async (payload) => {
        const {data} = await httpService.patch(userEndPoint + localStorageService.getUserId(), payload);
        return data;
    }
}

export default userService