import httpService from "./http.service";

const operationsHistoryEndPoint = '/history/'

const operationsHistoryService = {
    get: async () => {
        const {data} = await httpService.get(operationsHistoryEndPoint)
        return data
    },
    create: async (payload) => {
        const {data} = await httpService.post(operationsHistoryEndPoint, payload)
        return data
    }
}

export default operationsHistoryService