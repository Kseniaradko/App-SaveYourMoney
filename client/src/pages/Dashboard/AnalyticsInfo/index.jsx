import React from "react";
import chartIcon from './chartsIcon.svg'
import {Link} from 'react-router-dom'
import {Tabs, Tab, TabList, TabPanel} from 'react-tabs'
import Charts from "../../../components/common/charts";

const AnalyticsInfo = () => {
    return (
        <div>
            <div
                className='text-lg font-semibold pb-3 flex justify-center gap-1 '>
                <Link to='/chartsPage' className='hover:underline underline-offset-4'>Аналитика</Link>
                <img className='w-5' src={chartIcon} alt='chartIcon'/>
            </div>
            <div className="border-dotted border-4 border-sky-300 rounded-md px-6 py-0 bg-slate-50 shadow-xl relative">
                <Tabs>
                    <TabList className='absolute top-0, left-0 text-m gap-2 border-2'>
                        <Tab>Расходы</Tab>
                        <Tab>Доходы</Tab>
                    </TabList>

                    <TabPanel>
                        <Charts/>
                    </TabPanel>
                    <TabPanel>
                        <h2>Доходы</h2>
                    </TabPanel>
                </Tabs>

            </div>
        </div>
    )
}

export default AnalyticsInfo
