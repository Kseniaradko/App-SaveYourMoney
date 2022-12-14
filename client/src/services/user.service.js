import httpService from './http.service'

const userEndPoint = '/user/'

const userService = {
    get: async () => {
        const {data} = await httpService.get(userEndPoint)
        return data
    },
    update: async (payload) => {
        const {data} = await httpService.patch(userEndPoint, payload);
        console.log('service', data)
        return data;
    }
}

export default userService