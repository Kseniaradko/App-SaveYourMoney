import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {loadAccounts} from "../store/accounts";

const useGetAccounts = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadAccounts())
    }, [dispatch])
}

export default useGetAccounts