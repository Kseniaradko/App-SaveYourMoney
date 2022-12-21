import React, {useState} from "react";
import Table from "../../components/common/Table";
import {getOperationsLoadingStatus, getTotalOperationsPages, getUserOperations} from "../../store/operationsHistory";
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
import {FormikProvider, useFormik} from "formik";
import SelectField from "../../components/common/form/selectField";
import Button from "../../components/common/Button";

const types = [
    {
        _id: 'INCOME',
        name: 'Доход'
    },
    {
        _id: 'EXPENSE',
        name: 'Расход'
    },
    {
        _id: 'ACCOUNT',
        name: 'Счет'
    }
]

const actions = [
    {
        _id: 'ADD',
        name: 'Добавление'
    },
    {
        _id: 'EDIT',
        name: 'Редактирование'
    },
    {
        _id: 'DELETE',
        name: 'Удаление'
    },
]

const OperationsHistoryPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [type, setType] = useState(null)
    const [date, setDate] = useState(null)
    const [action, setAction] = useState(null)
    const userOperations = useSelector(getUserOperations())
    const loadingStatus = useSelector(getOperationsLoadingStatus())

    const totalPages = useSelector(getTotalOperationsPages())
    const limit = 5

    useGetOperations(currentPage, limit, {type, action, date})
    const disabledNext = totalPages === currentPage
    const disabledPrevious = currentPage === 1

    const handlePageNext = () => {
        setCurrentPage(prevState => prevState + 1)
    }

    const handlePagePrevious = () => {
        setCurrentPage(prevState => prevState - 1)
    }

    const handleDeleteFilters = () => {
        setType(null)
        setAction(null)
        setDate(null)
        formik.setFieldValue('type', '')
        formik.setFieldValue('action', '')
        setCurrentPage(1)
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

    const initialValues = {
        type: '',
        date: '',
        action: ''
    }

    const handleSubmit = (formValue) => {
        if (formValue.type) {
            setType(formValue.type)
        }
        if (formValue.action) {
            setAction(formValue.action)
        }
        setCurrentPage(1)
    }

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit
    })

    if (!userOperations) return <Loader/>

    return (
        <div className='max-w-screen-xl m-auto w-full h-full'>
            <div className='flex flex-col h-full'>
                <div>
                    <div className='text-center text-slate-600 font-semibold pt-5 uppercase italic'>
                        История операций
                    </div>
                    <FormikProvider value={formik}>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='flex flex-row gap-2'>
                                <div className='min-w-[150px] max-w-[200px]'>
                                    <SelectField
                                        label='Категория:'
                                        name='type'
                                        defaultOption='Choose...'
                                        options={types}
                                        value={formik.values.type}
                                    />
                                </div>
                                <div className='min-w-[150px] max-w-[200px]'>
                                    <SelectField
                                        label='Действие:'
                                        name='action'
                                        defaultOption='Choose...'
                                        options={actions}
                                        value={formik.values.action}
                                    />
                                </div>
                                <div className='min-h-[60px] flex items-center'>
                                    <Button
                                        face='primary'
                                    >
                                        Применить
                                    </Button>
                                </div>
                                <div className='min-h-[60px] flex items-center'>
                                    <Button
                                        face='secondary'
                                        type='button'
                                        onClick={handleDeleteFilters}
                                    >
                                        Отменить
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </FormikProvider>
                    {userOperations.length === 0 && (
                        <div
                            className='flex justify-center items-center text-xl italic font-light text-slate-500 min-h-[300px]'>
                            История операций отсутствует
                        </div>
                    )}
                    {userOperations.length > 0 && (
                        <div className='flex flex-col justify-between'>
                            <div className='relative'>
                                <Table
                                    columns={columns}
                                    data={userOperations}
                                />
                                {loadingStatus &&
                                    <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                                        <Loader/>
                                    </div>}
                            </div>
                            <div className='mt-9'>
                                <Pagination
                                    totalPages={totalPages}
                                    onPageNext={handlePageNext}
                                    onPagePrevious={handlePagePrevious}
                                    disabledNext={disabledNext}
                                    disabledPrevious={disabledPrevious}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default OperationsHistoryPage