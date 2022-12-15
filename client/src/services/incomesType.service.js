import httpService from "./http.service";

const incomeTypesEndPoint = '/incomeTypes/'

const incomeTypesService = {
    get: async () => {
        const {data} = await httpService.get(incomeTypesEndPoint)
        return data
    },
    create: async (payload) => {
        const {data} = await httpService.post(incomeTypesEndPoint, payload)
        return data
    },
    remove: async (typeId) => {
        const {data} = await httpService.delete(incomeTypesEndPoint + typeId)
        return data
    },
    update: async (typeId, payload) => {
        const {data} = await httpService.patch(incomeTypesEndPoint + typeId, payload)
        return data
    }
}

export default incomeTypesService