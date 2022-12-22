import React from "react";
import chartIcon from './chartsIcon.svg'
import {Link} from 'react-router-dom'
import TwoItemsChart from "../../../components/common/charts/twoItemsChart";

const AnalyticsInfo = () => {
    return (
        <div>
            <div
                className='text-lg font-semibold pb-3 flex justify-center gap-1 '>
                <Link to='/chartsPage' className='hover:underline underline-offset-4'>Аналитика</Link>
                <img className='w-5' src={chartIcon} alt='chartIcon'/>
            </div>
            <div
                className=" relative border-dotted border-4 border-sky-300 rounded-md px-6 py-0 bg-slate-50 shadow-xl min-h-[280px]"
            >
                <div className='mt-2'>
                    <TwoItemsChart/>
                </div>
            </div>
        </div>
    )
}

export default AnalyticsInfo
