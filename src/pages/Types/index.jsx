import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    getIncomeTypeLoadingStatus,
    getIncomeTypesWithoutDefault, getTotalIncomeTypesPages,
    removeIncomeType,
    updateIncomeType
} from '../../store/incomesType'
import {
    getExpensesTypesWithoutDefault, getExpenseTypeLoadingStatus, getTotalExpenseTypesPages,
    removeExpenseType,
    updateExpenseType
} from '../../store/expensesType'
import close from './close.svg'
import edit from './edit.svg'
import * as Yup from 'yup'
import {FormikProvider, useFormik} from 'formik'
import TextField from '../../components/common/form/textField'
import Button from '../../components/common/Button'
import Loader from '../../components/common/Loader'
import Pagination from '../../components/common/pagination'
import useGetTypesForPage from '../../hooks/useGetTypesForPage'

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Данное поле обязательно для заполнения')
})

const Types = () => {
    const dispatch = useDispatch()
    const incomeTypes = useSelector(getIncomeTypesWithoutDefault())
    const expenseTypes = useSelector(getExpensesTypesWithoutDefault())

    const iLoadingStatus = useSelector(getIncomeTypeLoadingStatus())
    const eLoadingStatus = useSelector(getExpenseTypeLoadingStatus())

    const incomeTypesPages = useSelector(getTotalIncomeTypesPages())
    const expenseTypesPages = useSelector(getTotalExpenseTypesPages())

    const limit = 10

    const [incomeCurrentPage, setICurrentPage] = useState(1)
    const [expenseCurrentPage, setECurrentPage] = useState(1)
    const [selectedItem, setSelectedItem] = useState(null)

    useGetTypesForPage(incomeCurrentPage, expenseCurrentPage, limit)

    const disabledINext = incomeTypesPages === incomeCurrentPage
    const disabledIPrevious = incomeCurrentPage === 1

    const disabledENext = expenseTypesPages === expenseCurrentPage
    const disabledEPrevious = expenseCurrentPage === 1

    const handleIncomePageNext = () => {
        setICurrentPage(prevState => prevState + 1)
    }

    const handleIncomePagePrevious = () => {
        setICurrentPage(prevState => prevState - 1)
    }

    const handleExpensePageNext = () => {
        setECurrentPage(prevState => prevState + 1)
    }

    const handleExpensePagePrevious = () => {
        setECurrentPage(prevState => prevState - 1)
    }

    const handleClick = (data, type) => {
        setSelectedItem({...data, class: type})
        formik.setFieldValue('name', data.name)
        formik.setFieldValue('class', type)
        formik.setFieldValue('_id', data._id)
    }

    const handleDelete = (id, type, currentPage) => {
        const method = type === 'INCOME' ? removeIncomeType : removeExpenseType
        dispatch(method(id, currentPage))
    }

    const initialValues = {
        name: '',
        _id: '',
        class: ''
    }

    const handleSubmit = (formValue) => {
        if (formValue.class === 'INCOME') {
            dispatch(updateIncomeType(formValue._id, formValue))
            setSelectedItem(null)
        } else {
            dispatch(updateExpenseType(formValue._id, formValue))
            setSelectedItem(null)
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit
    })

    if (!incomeTypes || !expenseTypes) return <Loader/>
    if (incomeTypes.length === 0 && incomeCurrentPage > 1) setICurrentPage(prevState => prevState - 1)
    if (expenseTypes.length === 0 && expenseCurrentPage > 1) setECurrentPage(prevState => prevState - 1)


    if (incomeTypes.length === 0 && expenseTypes.length === 0) {
        return (
            <div className='text-center text-xl italic font-light text-slate-500'>
                Категории доходов и расходов отсутствуют
            </div>
        )
    }

    return (
        <div className='flex flex-col justify-between h-full max-w-screen-xl m-auto w-full mt-4'>
            <div className='flex flex-row justify-between gap-4 h-full'>
                <div className='flex flex-col justify-between h-full'>
                    <div className='flex justify-center'>
                        <ul className='bg-white rounded-lg w-96 text-gray-900 relative'>
                            {iLoadingStatus &&
                                <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                                    <Loader/>
                                </div>
                            }
                            <li
                                className='text-center text-slate-600 font-semibold py-5 uppercase italic border-b border-gray-200'
                                key='incomeTitle'
                            >
                                Категории доходов
                            </li>
                            {incomeTypes.map((income) => (
                                    <li
                                        className='flex flex-row justify-between px-6 py-2 border-b border-gray-200 w-full'
                                        key={income._id}
                                    >
                                        <div>{income.name}</div>
                                        <div className='flex gap-4'>
                                            <img
                                                src={edit}
                                                className='w-6 cursor-pointer'
                                                alt={edit}
                                                onClick={() => handleClick(income, 'INCOME')}
                                            />
                                            <img
                                                src={close}
                                                className='w-6 cursor-pointer'
                                                alt='delete'
                                                onClick={() => handleDelete(income._id, 'INCOME', incomeCurrentPage)}
                                            />
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                    <div>
                        <Pagination
                            totalPages={incomeTypesPages}
                            onPageNext={handleIncomePageNext}
                            onPagePrevious={handleIncomePagePrevious}
                            disabledNext={disabledINext}
                            disabledPrevious={disabledIPrevious}
                        />
                    </div>
                </div>
                {selectedItem && (
                    <div
                        className='flex flex-col rounded-lg min-w-[350px] max-h-[300px] ring-1 ring-slate-900/5 shadow-xl p-6'
                    >
                        <label
                            className='text-center text-slate-500 text-2xl underline underline-offset-8 py-4'
                        >
                            Редактирование категории
                        </label>
                        <div
                            className='text-left text-lg font-medium text-gray-900'
                        >
                            {`Тип: ${selectedItem.class === 'INCOME' ? 'Доход' : 'Расход'}`}
                        </div>
                        <div className='w-full'>
                            <FormikProvider value={formik}>
                                <form onSubmit={formik.handleSubmit}>
                                    <TextField
                                        label='Название категории:'
                                        name='name'
                                    />
                                    <div className='flex gap-2'>
                                        <Button
                                            face='secondary'
                                            onClick={() => setSelectedItem(null)}
                                            type='button'
                                        >
                                            Назад
                                        </Button>
                                        <Button
                                            face='primary'
                                        >
                                            Сохранить
                                        </Button>
                                    </div>
                                </form>
                            </FormikProvider>
                        </div>
                    </div>
                )}
                <div className='flex flex-col justify-between h-full'>
                    <div className='flex justify-center'>
                        <ul className='bg-white rounded-lg w-96 text-gray-900 relative'>
                            {eLoadingStatus &&
                                <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'><Loader/>
                                </div>}
                            <li
                                className='text-center text-slate-600 font-semibold py-5 uppercase italic border-b border-gray-200'
                                key='expenseTitle'
                            >
                                Категории расходов
                            </li>
                            {expenseTypes.map((expense) => (
                                <li
                                    className='flex flex-row justify-between px-6 py-2 border-b border-gray-200 w-full'
                                    key={expense._id}
                                >
                                    <div>{expense.name}</div>
                                    <div className='flex gap-4'>
                                        <img
                                            src={edit}
                                            className='w-6 cursor-pointer'
                                            alt={edit}
                                            onClick={() => handleClick(expense, 'EXPENSE')}
                                        />
                                        <img
                                            src={close}
                                            className='w-6 cursor-pointer'
                                            alt='delete'
                                            onClick={() => handleDelete(expense._id, 'EXPENSE', expenseCurrentPage)}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <Pagination
                            totalPages={expenseTypesPages}
                            onPageNext={handleExpensePageNext}
                            onPagePrevious={handleExpensePagePrevious}
                            disabledNext={disabledENext}
                            disabledPrevious={disabledEPrevious}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Types