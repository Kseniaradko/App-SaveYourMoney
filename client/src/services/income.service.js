import httpService from "./http.service";

const incomeEndPoint = '/income/'

const incomeService = {
    get: async () => {
        const {data} = await httpService.get(incomeEndPoint)
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