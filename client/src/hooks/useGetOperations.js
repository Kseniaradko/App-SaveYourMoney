import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {loadOperationsList} from "../store/operationsHistory";

const useGetOperations = (currentPage, limit) => {
    const offset = (currentPage - 1) * limit
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadOperationsList({offset, limit}))
    }, [currentPage])
}

export default useGetOperations