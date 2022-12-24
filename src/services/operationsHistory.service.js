import httpService from './http.service'

const operationsHistoryEndPoint = '/history/'

const operationsHistoryService = {
    get: async (offset, limit, filter) => {
        let query = `?offset=${offset}&limit=${limit}`

        if (filter.type) {
            query += `&type=${filter.type}`
        }
        if (filter.date) {
            query += `&date=${filter.date}`
        }
        if (filter.action) {
            query += `&action=${filter.action}`
        }

        const {data} = await httpService.get(operationsHistoryEndPoint + query)
        return data
    },
    create: async (payload) => {
        const {data} = await httpService.post(operationsHistoryEndPoint, payload)
        return data
    }
}

export default operationsHistoryService