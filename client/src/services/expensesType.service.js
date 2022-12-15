import httpService from "./http.service";

const expenseTypesEndPoint = '/expenseTypes/'

const expenseTypesService = {
    get: async () => {
        const {data} = await httpService.get(expenseTypesEndPoint)
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