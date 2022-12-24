import React, {useState} from 'react'
import Table from '../../components/common/Table'
import {getOperationsLoadingStatus, getTotalOperationsPages, getUserOperations} from '../../store/operationsHistory'
import {useSelector} from 'react-redux'
import displayDate from '../../utils/displayDate'
import {
    displayAction,
    displayDetailsForOperations,
    displayType
} from '../../utils/displayDataForOperations'
import Loader from '../../components/common/Loader'
import Pagination from '../../components/common/pagination'
import useGetOperations from '../../hooks/useGetOperations'
import {FormikProvider, useFormik} from 'formik'
import SelectField from '../../components/common/form/selectField'
import Button from '../../components/common/Button'
import Datepicker from 'tailwind-datepicker-react'

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

const options = {
    autoHide: true,
    todayBtn: true,
    clearBtn: true,
    maxDate: new Date('2030-01-01'),
    minDate: new Date('1950-01-01')
}

const OperationsHistoryPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [type, setType] = useState(null)
    const [date, setDate] = useState(null)
    const [action, setAction] = useState(null)
    const [show, setShow] = useState(false)
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

    const handleChange = (selectedDate) => {
        const year = selectedDate.getFullYear()
        const month = selectedDate.getMonth() + 1
        const day = selectedDate.getDate()
        const date = year + '-' + month + '-' + day + 'T' + '00:00:00.000Z'
        formik.setValues({date: date})
    }
    const handleClose = (state) => {
        setShow(state)
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
        if (formValue.date) {
            setDate(formValue.date)
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
                    <div
                        className='text-center text-slate-500 text-2xl underline underline-offset-8 pt-4'>
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
                                <div className='max-w-[250px] mt-1'>
                                    <div className='mb-2'>
                                        <label
                                            className='text-sm font-medium text-gray-900 dark:text-white'>Дата:</label>
                                    </div>
                                    <Datepicker
                                        options={options}
                                        onChange={handleChange}
                                        show={show}
                                        setShow={handleClose}/>
                                </div>
                                <div className='flex items-end mb-3'>
                                    <Button
                                        face='filter'
                                    >
                                        Применить
                                    </Button>
                                </div>
                                <div className='flex items-end mb-3'>
                                    <Button
                                        face='deleteFilter'
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