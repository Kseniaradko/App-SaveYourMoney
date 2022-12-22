import React, {useState} from "react";
import {useSelector} from "react-redux";
import {getChartsData, getChartsLoadingStatus} from "../../store/charts";
import OneItemChart from "../../components/common/charts/oneItemChart";
import useGetInfoForCharts from "../../hooks/useGetInfoForCharts";
import Loader from "../../components/common/Loader";

const ChartsPage = () => {
    useGetInfoForCharts()
    const data = useSelector(getChartsData())
    const loadingStatus = useSelector(getChartsLoadingStatus())
    console.log('chart', data)
    let keys = []
    if (data) {
        keys = Object.keys(data[0])
    }
    console.log('key', keys)
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const tabsData = [
        {
            label: 'Доходы',
            content:
                <OneItemChart data={data} dataKey={keys[1]} label='Изменение доходов за последний месяц'/>,
        },
        {
            label: 'Расходы',
            content:
                <OneItemChart data={data} dataKey={keys[2]} label='Изменение расходов за последний месяц'/>,
        }
    ]

    if (loadingStatus || !data) return <Loader/>

    return (
        <div className='flex flex-col h-full max-w-screen-xl m-auto w-full'>
            <div className='text-center text-slate-500 text-2xl underline underline-offset-8 pt-4'>
                Аналитика
            </div>
            <div>
                <div className="flex space-x-3 border-b max-w-[155px]">
                    {tabsData.map((tab, idx) => {
                        return (
                            <button
                                key={idx}
                                className={`py-2 border-b-4 transition-colors duration-300 text-lg text-slate-500 ${
                                    idx === activeTabIndex
                                        ? 'border-sky-500'
                                        : 'border-transparent hover:border-gray-200'
                                }`}
                                onClick={() => setActiveTabIndex(idx)}
                            >
                                {tab.label}
                            </button>
                        )
                    })}
                </div>
                <div className="py-4 flex justify-center">
                    {tabsData[activeTabIndex].content}
                </div>
            </div>

        </div>
    )
}

export default ChartsPage


// <div className=''>
//     <OneItemChart data={data} dataKey={keys[1]}/>
// </div>
// <div>
//     <OneItemChart data={data} dataKey={keys[2]}/>
// </div>