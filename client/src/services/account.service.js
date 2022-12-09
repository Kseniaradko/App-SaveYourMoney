import httpService from "./http.service";


const accountEndPoint = '/account/'

const accountService = {
    get: async () => {
        const {data} = await httpService.get(accountEndPoint)
        return data
    },
    create: async (payload) => {
        const {data} = await httpService.post(accountEndPoint, payload)
        return data
    },
    removeAccount: async (accountId) => {
        const {data} = await httpService.delete(accountEndPoint + accountId)
        return data
    },
    updateAccount: async (accountId, payload) => {
        const {data} = await httpService.patch(accountEndPoint + accountId, payload)
        return data
    }
}

export default accountService