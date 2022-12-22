import httpService from "./http.service";

const noteEndPoint = '/notes/'

const noteService = {
    get: async () => {
        const {data} = await httpService.get(noteEndPoint)
        return data
    },
    create: async (payload) => {
        const {data} = await httpService.post(noteEndPoint, payload)
        return data
    },
    update: async (noteId, payload) => {
        const queryParam = `?noteId=${noteId}`
        const {data} = await httpService.patch(noteEndPoint + queryParam, payload)
        return data
    },
    remove: async (noteId) => {
        const queryParam = `?noteId=${noteId}`
        const {data} = await httpService.delete(noteEndPoint + queryParam)
        return data
    }
}

export default noteService