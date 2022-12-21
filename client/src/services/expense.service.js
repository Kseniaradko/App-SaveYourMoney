import httpService from "./http.service";

const expenseEndPoint = '/expense/'

const expenseService = {
    get: async (offset, limit, filter) => {
        let queryParams = ''

        if (limit) {
            queryParams = `?offset=${offset}&limit=${limit}`
        }
        if (filter) {
            if (filter.category) {
                queryParams += `&category=${filter.category}`
            }

            if (filter.sum) {
                queryParams += `&sum=${filter.sum}`
            }

            if (filter.accountId) {
                queryParams += `&accountId=${filter.accountId}`
            }
            if (filter.date) {
                queryParams += `&date=${filter.date}`
            }
        }

        const {data} = await httpService.get(expenseEndPoint + queryParams)
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