import React, {useState} from "react";
import Table from "../../components/common/Table";
import {getTotalOperationsPages, getUserOperations} from "../../store/operationsHistory";
import {useSelector} from "react-redux";
import displayDate from "../../utils/displayDate";
import {
    displayAction,
    displayDetailsForOperations,
    displayType
} from "../../utils/displayDataForOperations";
import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/pagination";
import useGetOperations from "../../hooks/useGetOperations";

const OperationsHistoryPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const userOperations = useSelector(getUserOperations())

    const totalPages = useSelector(getTotalOperationsPages())
    const limit = 7

    useGetOperations(currentPage, limit)
    const disabledNext = totalPages === currentPage
    const disabledPrevious = currentPage === 1

    const handlePageNext = () => {
        setCurrentPage(prevState => prevState + 1)
    }

    const handlePagePrevious = (pageIndex) => {
        setCurrentPage(prevState => prevState - 1)
    }

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
        <div className='max-w-screen-xl m-auto w-full h-full'>
            <div className='flex flex-col justify-between h-full'>
                <div>
                    <div className='text-center text-slate-600 font-semibold py-5 uppercase italic'>История операций
                    </div>
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
                </div>
                <div>
                    <Pagination
                        totalPages={totalPages}
                        onPageNext={handlePageNext}
                        onPagePrevious={handlePagePrevious}
                        disabledNext={disabledNext}
                        disabledPrevious={disabledPrevious}
                    />
                </div>
            </div>
        </div>
    )
}

export default OperationsHistoryPage