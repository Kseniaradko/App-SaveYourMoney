import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts'
import Loader from '../Loader'


const OneItemChart = ({data, dataKey, label}) => {
    let name = ''
    if (dataKey === 'income') {
        name = 'Доходы'
    }
    if (dataKey === 'expense') {
        name = 'Расходы'
    }
    if (!data) return <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'><Loader/></div>
    if (data.length === 0) return (
        <div
            className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xl italic font-light text-slate-500'
        >
            Данные отсутствуют
        </div>
    )
    return (
        <div className='flex flex-col'>
            <label className='text-center text-slate-500 text-xl mb-5'>{label}</label>
            <LineChart
                width={1000}
                height={300}
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
                <Line type="monotone" dataKey={dataKey} name={name} stroke="#82ca9d"/>
            </LineChart>
        </div>
    );
}

export default OneItemChart