import httpService from "./http.service";

const incomeTypesEndPoint = '/incomeTypes/'

const incomeTypesService = {
    get: async (offset, limit) => {
        let queryParams = ''
        if (limit) {
            queryParams = `?offset=${offset}&limit=${limit}`
        }
        const {data} = await httpService.get(incomeTypesEndPoint + queryParams)
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