import httpService from "./http.service";

const chartsEndPoint = '/charts'

const chartsService = {
    get: async () => {
        const {data} = await httpService.get(chartsEndPoint)
        return data
    }
}

export default chartsService