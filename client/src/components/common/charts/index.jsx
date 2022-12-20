import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import useGetInfoForCharts from "../../../hooks/useGetInfoForCharts";
import Loader from "../Loader";


const Charts = () => {
    const data = useGetInfoForCharts()
    if (!data) return <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'><Loader/></div>
    if (data.length === 0) return (
        <div
            className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xl italic font-light text-slate-500'
        >
            Данные отсутствуют
        </div>
    )
    return (
        <LineChart
            width={1200}
            height={250}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Line
                type="monotone"
                name="Расходы"
                dataKey="expense"
                stroke="#8884d8"
                activeDot={{r: 8}}
            />
            <Line type="monotone" dataKey="income" name="Доходы" stroke="#82ca9d"/>
        </LineChart>
    );
}

export default Charts