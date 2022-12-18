import React from "react";
import Table from "../../components/common/Table";
import {getUserOperations} from "../../store/operationsHistory";
import {useSelector} from "react-redux";
import displayDate from "../../utils/displayDate";
import {
    displayAction,
    displayDetailsForOperations,
    displayType
} from "../../utils/displayDataForOperations";
import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/pagination";

const OperationsHistoryPage = () => {
    const userOperations = useSelector(getUserOperations())

    const columns = {
        type: {
            name: 'Категория',
            path: 'type',
            component: (data) => displayType(data)
        },
        action: {
            name: 'Действие',
            path: 'action',
            component: (data) => displayAction(data)
        },
        createdAt: {
            name: 'Дата',
            path: 'createdAt',
            component: (data) => displayDate(data.createdAt)
        },
        details: {
            name: 'Детали',
            path: 'details',
            component: (data) => displayDetailsForOperations(data)
        }
    }

    if (!userOperations) return <Loader/>

    return (
        <div className='flex-1 max-w-screen-xl m-auto w-full'>
            <div className='text-center text-slate-600 font-semibold py-5 uppercase italic'>История операций</div>
            {userOperations.length === 0 && (
                <div className='text-center text-xl italic font-light text-slate-500'>
                    История операций отсутствует. Начните добавлять их на главной странице!
                </div>
            )}
            {userOperations.length > 0 && (
                <Table
                    columns={columns}
                    data={userOperations}
                />
            )}
            <Pagination/>
        </div>
    )
}

export default OperationsHistoryPage