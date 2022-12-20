import {useState, useEffect} from 'react'

import chartsService from "../services/charts.service";

const useGetInfoForCharts = () => {
    const [res, setRes] = useState(null)

    useEffect(() => {
        chartsService.get().then((data) => {
            const result = []
            const content = data.content

            Object.keys(content).forEach((item) => {
                const key = {
                    name: item,
                    income: content[item].incomes,
                    expense: content[item].expenses
                }
                result.push(key)
            })

            setRes(result)
        })

    }, [])

    return res
}

export default useGetInfoForCharts