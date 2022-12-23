import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {loadChartsList} from '../store/charts'

const useGetInfoForCharts = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadChartsList())
    }, [dispatch])

}

export default useGetInfoForCharts