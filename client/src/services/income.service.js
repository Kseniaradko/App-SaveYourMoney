import httpService from "./http.service";

const incomeEndPoint = '/income/'

const incomeService = {
    get: async (offset, limit) => {
        let queryParams = ''
        if (limit) {
            queryParams = `?offset=${offset}&limit=${limit}`
        }
        const {data} = await httpService.get(incomeEndPoint + queryParams)
        return data
    },
    create: async (payload) => {
        const {data} = await httpService.post(incomeEndPoint, payload)
        return data
    },
    removeIncome: async (incomeId) => {
        const {data} = await httpService.delete(incomeEndPoint + incomeId)
        return data
    },
    updateIncome: async (incomeId, payload) => {
        const {data} = await httpService.patch(incomeEndPoint + incomeId, payload)
        return data
    }
}

export default incomeService