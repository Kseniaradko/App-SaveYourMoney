import React from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getIncomeById, updateIncome} from '../../../store/incomes'
import {useFormik, FormikProvider} from 'formik'
import * as Yup from 'yup'
import TextField from '../../../components/common/form/textField'
import {getAccounts} from '../../../store/accounts'
import Loader from '../../../components/common/Loader'
import history from '../../../utils/history'
import SelectField from '../../../components/common/form/selectField'
import {createOperation} from '../../../store/operationsHistory'
import {getIncomesTypes} from '../../../store/incomesType'
import Button from '../../../components/common/Button'
import useGetTypes from '../../../hooks/useGetTypes'

const validationSchema = Yup.object().shape({
    category: Yup.string()
        .required('Данное поле обязательно для заполнения'),
    accountId: Yup.string()
        .required('Данное поле обязательно для заполнения'),
    sum: Yup.number()
        .required('Данное поле обязательно для заполнения')
        .typeError('Сумма зачисления должна быть числом')
})

const EditIncomePage = () => {
    useGetTypes()
    const dispatch = useDispatch()
    const params = useParams()
    const {incomeId} = params
    const income = useSelector(getIncomeById(incomeId))
    const accounts = useSelector(getAccounts())
    const types = useSelector(getIncomesTypes())


    const initialValues = {
        category: income.category,
        sum: income.sum,
        accountId: income.accountId
    }

    const handleSubmit = (formValue) => {

        dispatch(updateIncome(incomeId, formValue))
        const account = accounts.filter((acc) => acc._id === formValue.accountId)[0]
        const accountLabel = account?.name
        const typeName = types.find((type) => type._id === formValue.category).name

        const operation = {
            type: 'INCOME',
            action: 'EDIT',
            category: typeName,
            sum: formValue.sum,
            accountName: accountLabel
        }

        dispatch(createOperation(operation))

        history.goBack()
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: true,
        onSubmit: handleSubmit
    })

    if (!income) {
        return <Loader/>
    }

    return (
        <div
            className='max-w-screen-xl m-auto w-full flex flex-col items-center rounded-lg w-96 ring-1 ring-slate-900/5 shadow-xl p-6 '>
            <div className='text-center text-slate-500 text-2xl underline underline-offset-8 py-4'>
                Редактирование операции
            </div>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <SelectField
                        label='Категория:'
                        name='category'
                        defaultOption='Choose...'
                        options={types}
                        value={formik.values.category || ''}
                    />
                    <SelectField
                        label='Выберите счет зачисления денежных средств:'
                        name='accountId'
                        value={formik.values.accountId || ''}
                        defaultOption='Choose...'
                        options={accounts}
                    />
                    <TextField
                        label='Сумма зачисления:'
                        name='sum'
                        value={formik.values.sum}
                        placeholder='30000'
                    />
                    <div className='flex gap-2 mt-4'>
                        <Button
                            face='secondary'
                            type='button'
                            onClick={() => history.goBack()}
                        >
                            Назад
                        </Button>
                        <Button
                            face='primary'
                            disabled={!formik.isValid || !formik.dirty}
                        >
                            Сохранить
                        </Button>
                    </div>
                </form>
            </FormikProvider>
        </div>
    )
}

export default EditIncomePage