import httpService from "./http.service";

const expenseEndPoint = '/expense/'

const expenseService = {
    get: async () => {
        const {data} = await httpService.get(expenseEndPoint)
        return data
    },
    create: async (payload) => {
        const {data} = await httpService.post(expenseEndPoint, payload)
        return data
    },
    removeExpense: async (expenseId) => {
        const {data} = await httpService.delete(expenseEndPoint + expenseId)
        return data
    },
    updateExpense: async (expenseId, payload) => {
        const {data} = await httpService.patch(expenseEndPoint + expenseId, payload)
        return data
    }
}

export default expenseService