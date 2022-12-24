import React, {useState} from 'react'
import Table from '../../components/common/Table'
import EditIcon from '../../components/common/Table/editIcon'
import DeleteIcon from '../../components/common/Table/deleteIcon'
import {useDispatch, useSelector} from 'react-redux'
import {
    getCurrentUserExpenses,
    getExpenseLoadingStatus,
    getTotalExpensePages,
    removeExpense
} from '../../store/expenses'
import {Link} from 'react-router-dom'
import {getAccounts} from '../../store/accounts'
import Loader from '../../components/common/Loader'
import displayDate from '../../utils/displayDate'
import Button from '../../components/common/Button'
import {createOperation} from '../../store/operationsHistory'
import {getExpensesTypes} from '../../store/expensesType'
import Pagination from '../../components/common/pagination'
import useGetTypes from '../../hooks/useGetTypes'
import useGetExpensesForPage from '../../hooks/useGetExpensesForPage'
import {FormikProvider, useFormik} from 'formik'
import SelectField from '../../components/common/form/selectField'
import TextField from '../../components/common/form/textField'
import Datepicker from 'tailwind-datepicker-react'
import useGetAccountsForPage from '../../hooks/useGetAccountsForPage'

const initialValues = {
    category: '',
    accountId: '',
    sum: ''
}

const options = {
    autoHide: true,
    todayBtn: true,
    clearBtn: true,
    maxDate: new Date('2030-01-01'),
    minDate: new Date('1950-01-01')
}

const ExpensesPage = () => {

    const dispatch = useDispatch()
    const userExpenses = useSelector(getCurrentUserExpenses())
    const userAccounts = useSelector(getAccounts())
    const userTypes = useSelector(getExpensesTypes())
    const expensesPages = useSelector(getTotalExpensePages())
    const loadingStatus = useSelector(getExpenseLoadingStatus())

    const limit = 5
    const [currentPage, setCurrentPage] = useState(1)
    const [category, setSelectedCategory] = useState(null)
    const [accountId, setSelectedAccount] = useState(null)
    const [sum, setSelectedSum] = useState(null)
    const [date, setDate] = useState(null)
    const [show, setShow] = useState(false)
    useGetExpensesForPage(currentPage, limit, {category, accountId, sum, date})
    useGetAccountsForPage(1, 0)
    useGetTypes()


    const disabledNext = expensesPages === currentPage
    const disabledPrevious = currentPage === 1

    const handlePageNext = () => {
        setCurrentPage(prevState => prevState + 1)
    }

    const handlePagePrevious = (pageIndex) => {
        setCurrentPage(prevState => prevState - 1)
    }

    const handleDeleteFilters = () => {
        setSelectedSum(null)
        setSelectedAccount(null)
        setSelectedCategory(null)
        setDate(null)
        formik.setFieldValue('category', '')
        formik.setFieldValue('accountId', '')
        formik.setFieldValue('sum', '')
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
        _id: {
            name: '№',
            path: '_id',
            component: (data) => {
                if (currentPage === 1) return userExpenses.indexOf(data) + 1
                return (limit * currentPage) - ((limit - 1) - userExpenses.indexOf(data))
            }
        },
        category: {
            name: 'Категория',
            path: 'category',
            component: (data) => {
                const type = userTypes.find((item) => item._id === data.category)
                if (type) return type.name
                return <>Категория была удалена</>
            }
        },
        accountId: {
            name: 'Счет зачисления',
            path: 'accountId',
            component: (data) => {
                const account = userAccounts.find((account) => account._id === data.accountId)
                if (account) return account.name
                return 'Данный счет был удален'
            }
        },
        sum: {
            name: 'Сумма зачисления',
            path: 'sum'
        },
        createdAt: {
            name: 'Дата',
            path: 'createdAt',
            component: (data) => displayDate(data.createdAt)
        },
        edit: {
            name: 'Редактировать',
            component: (data) => <Link to={`/expensesPage/${data._id}`}><EditIcon/></Link>
        },
        delete: {
            name: 'Удалить',
            component: (data) => <DeleteIcon onDelete={() => handleDelete(data._id, currentPage)}/>
        }
    }

    const handleDelete = (id, currentPage) => {
        dispatch(removeExpense(id, currentPage))

        const expense = userExpenses.filter((expense) => expense._id === id)[0]
        const type = userTypes.filter((type) => type._id === expense.category)[0]
        const typeName = type?.name
        const account = userAccounts.filter((acc) => acc._id === expense.accountId)[0]
        const accountLabel = account?.name

        const operation = {
            type: 'EXPENSE',
            action: 'DELETE',
            category: typeName || null,
            sum: expense.sum,
            accountName: accountLabel || null
        }
        dispatch(createOperation(operation))
    }

    const handleSubmit = (formValue) => {
        if (formValue.category) {
            setSelectedCategory(formValue.category)
        }
        if (formValue.accountId) {
            setSelectedAccount(formValue.accountId)
        }
        if (formValue.sum) {
            setSelectedSum(formValue.sum)
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

    if (!userExpenses || !userAccounts || !userTypes) return <Loader/>
    if (userExpenses.length === 0 && currentPage > 1) setCurrentPage(prevState => prevState - 1)

    return (
        <div className='flex flex-col justify-between h-full max-w-screen-xl m-auto w-full'>
            <div className='relative'>
                <div
                    className='text-center text-slate-500 text-2xl underline underline-offset-8 pt-4'
                >
                    Мои расходы
                </div>
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='flex flex-row gap-2'>
                            <div className='min-w-[150px] max-w-[200px]'>
                                <SelectField
                                    label='Категория:'
                                    name='category'
                                    defaultOption='Choose...'
                                    options={userTypes}
                                    value={formik.values.category}
                                />
                            </div>
                            <div className='min-w-[150px] max-w-[200px]'>
                                <SelectField
                                    label='Счет:'
                                    name='accountId'
                                    defaultOption='Choose...'
                                    options={userAccounts}
                                    value={formik.values.accountId}
                                />
                            </div>
                            <div className='max-w-[150px]'>
                                <TextField
                                    label='Сумма:'
                                    name='sum'
                                    value={formik.values.sum}
                                    placeholder='3000'
                                />
                            </div>
                            <div className='max-w-[250px] mt-1'>
                                <div className='mb-2'>
                                    <label className='text-sm font-medium text-gray-900 dark:text-white'>Дата:</label>
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
                {userExpenses.length === 0 && (
                    <div
                        className='flex justify-center items-center text-xl italic font-light text-slate-500 min-h-[300px]'>
                        Расходы отсутствуют. Начните добавлять их!
                    </div>
                )}
                {userExpenses.length > 0 && (
                    <div className='flex flex-col justify-between'>
                        <div className='relative'>
                            <Table
                                columns={columns}
                                data={userExpenses}
                            />
                            {loadingStatus &&
                                <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                                    <Loader/>
                                </div>
                            }
                        </div>
                        <div className='mt-4'>
                            <Pagination
                                totalPages={expensesPages}
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
    )
}

export default ExpensesPage