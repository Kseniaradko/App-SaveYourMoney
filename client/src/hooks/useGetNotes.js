import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {loadNotesList} from "../store/notes";


const useGetNotes = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadNotesList())
    }, [dispatch])
}

export default useGetNotes