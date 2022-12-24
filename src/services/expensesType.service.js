import httpService from './http.service'

const expenseTypesEndPoint = '/expenseTypes/'

const expenseTypesService = {
    get: async (offset, limit) => {
        let queryParams = ''
        if (limit) {
            queryParams = `?offset=${offset}&limit=${limit}`
        }
        const {data} = await httpService.get(expenseTypesEndPoint + queryParams)
        return data
    },
    create: async (payload) => {
        const {data} = await httpService.post(expenseTypesEndPoint, payload)
        return data
    },
    remove: async (typeId) => {
        const {data} = await httpService.delete(expenseTypesEndPoint + typeId)
        return data
    },
    update: async (typeId, payload) => {
        const {data} = await httpService.patch(expenseTypesEndPoint + typeId, payload)
        return data
    }
}

export default expenseTypesService