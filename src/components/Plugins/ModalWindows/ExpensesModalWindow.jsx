import React, {useState} from 'react'
import TextField from '../../common/form/textField'
import {FormikProvider, useFormik} from 'formik'
import * as Yup from 'yup'
import SelectField from '../../common/form/selectField'
import {useDispatch, useSelector} from 'react-redux'
import {getAccounts} from '../../../store/accounts'
import {createExpense} from '../../../store/expenses'
import {createOperation} from '../../../store/operationsHistory'
import Button from '../../common/Button'
import closeIcon from './closeIcon.svg'
import {createExpenseType, getExpensesTypes} from '../../../store/expensesType'
import useGetTypes from '../../../hooks/useGetTypes'
import useGetAccountsForPage from '../../../hooks/useGetAccountsForPage'

const validationSchema = Yup.object().shape({
    category: Yup.string()
        .required('Данное поле обязательно для заполнения'),
    accountId: Yup.string()
        .required('Данное поле обязательно для заполнения'),
    sum: Yup.number()
        .required('Данное поле обязательно для заполнения')
        .typeError('Сумма зачисления должна быть числом'),
    newCategory: Yup.string()
        .min(1, 'Категория должно содержать не менее 1 символа')
})

const initialValues = {
    category: '',
    accountId: '',
    sum: '',
    newCategory: ''
}

const ExpensesModalWindow = ({onCLick}) => {
    useGetTypes()
    useGetAccountsForPage(1, 0)
    const dispatch = useDispatch()
    const accounts = useSelector(getAccounts())
    const types = useSelector(getExpensesTypes())

    const [category, setCategory] = useState(false)
    const addNewCategory = (data) => {
        dispatch(createExpenseType({name: data}))
        onAdd()
    }
    const onAdd = () => {
        setCategory(prevState => !prevState)
    }

    const handleSubmit = (formValue) => {
        const result = {
            category: formValue.category,
            accountId: formValue.accountId,
            sum: formValue.sum
        }
        dispatch(createExpense(result))

        const typeName = types.filter((type) => type._id === formValue.category)[0].name
        const accountLabel = accounts.filter((acc) => acc._id === formValue.accountId)[0].name
        const operation = {
            type: 'EXPENSE',
            action: 'ADD',
            category: typeName,
            sum: formValue.sum,
            accountName: accountLabel
        }
        dispatch(createOperation(operation))

        onCLick()
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: true,
        onSubmit: handleSubmit
    })

    return (
        <>
            <div
                className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
            >
                <div className='relative w-auto my-6 mx-auto min-w-[355px] min-h-[410px]'>
                    <div
                        className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                        <div
                            className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                            <h3 className='text-3xl font-semibold'>
                                Добавить расход
                            </h3>
                            <img
                                src={closeIcon}
                                className='absolute top-4 right-4 w-8 cursor-pointer shadow-2xl'
                                onClick={onCLick}
                                alt='plus'
                            />
                        </div>
                        <div className='relative px-6 py-3 flex-auto'>
                            <FormikProvider value={formik}>
                                <form onSubmit={formik.handleSubmit}>
                                    <SelectField
                                        label='Категория:'
                                        name='category'
                                        defaultOption='Choose...'
                                        options={types}
                                        value={formik.values.category}
                                    />
                                    {!category && (
                                        <div onClick={onAdd}
                                             className='mt-2 text-sm text-slate-400 cursor-pointer text-right hover:text-slate-700'>
                                            Добавить новую категорию
                                        </div>
                                    )}
                                    {category && (
                                        <>
                                            <div onClick={onAdd}
                                                 className='mt-2 text-sm text-slate-400 cursor-pointer text-right hover:text-slate-700'>
                                                Скрыть поле добавления
                                            </div>
                                            <TextField
                                                label='Новая категория'
                                                name='newCategory'
                                                placeholder='Транспорт'
                                                value={formik.values.newCategory}
                                                type='add'
                                            />
                                            <div className='flex justify-end'>
                                                <Button
                                                    face='addition'
                                                    onClick={() => addNewCategory(formik.values.newCategory)}
                                                >
                                                    Добавить
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                    <SelectField
                                        label='Выберите счет списания денежных средств:'
                                        name='accountId'
                                        defaultOption='Choose...'
                                        options={accounts}
                                        value={formik.values.accountId}
                                    />
                                    <TextField
                                        label='Сумма списания:'
                                        name='sum'
                                        placeholder='2000'
                                        value={formik.values.sum}
                                    />
                                    <div className='flex justify-end mb-3'>
                                        <Button
                                            face='primary'
                                            type='submit'
                                            disabled={!formik.isValid}
                                        >
                                            Сохранить
                                        </Button>
                                    </div>
                                </form>
                            </FormikProvider>
                        </div>
                    </div>
                </div>
            </div>
            <div className='opacity-50 fixed inset-0 z-40 bg-black'></div>
        </>
    )
}

export default ExpensesModalWindow