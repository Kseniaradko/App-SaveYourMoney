import React from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useFormik, FormikProvider} from "formik";
import * as Yup from "yup";
import TextField from "../../../components/common/form/textField";
import {getAccountNameById} from "../../../store/accounts";
import Loader from "../../../components/common/Loader";
import {getExpenseById} from "../../../store/expenses";
import history from "../../../utils/history";

const validationSchema = Yup.object().shape({
    type: Yup.string()
        .required('Данное поле обязательно для заполнения'),
    account: Yup.string()
        .required('Данное поле обязательно для заполнения'),
    sum: Yup.number()
        .required('Данное поле обязательно для заполнения')
        .typeError('Сумма зачисления должна быть числом')
})

const EditExpensesPage = () => {
    const params = useParams()
    const {expenseId} = params
    const expense = useSelector(getExpenseById(expenseId))
    const accountName = useSelector(getAccountNameById(expense?.accountId))

    const handleSubmit = (formValue) => {
        console.log(formValue)
    }
    const formik = useFormik({
        initialValues: expense,
        validationSchema,
        validateOnChange: true,
        onSubmit: handleSubmit
    })

    if (!expense) {
        return <Loader/>
    }

    return (
        <div
            className='max-w-screen-xl m-auto w-full flex flex-col items-center rounded-lg overflow-hidden w-96 ring-1 ring-slate-900/5 shadow-xl p-6 '>
            <div className='text-center text-slate-500 text-2xl underline underline-offset-8 py-4'>
                Редактирование операции
            </div>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label='Категория:'
                        name='type'
                        value={expense.type}
                        placeholder='Заработная плата'
                    />
                    <TextField
                        label='Выберите счет зачисления денежных средств:'
                        name='account'
                        value={accountName}
                        placeholder='Дебетовая карта 324567656938'
                    />
                    <TextField
                        label='Сумма зачисления:'
                        name='sum'
                        value={expense.sum}
                        placeholder='30000'
                    />
                    <div className='flex justify-end mt-4'>
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-3 text-sm outline-none hover:bg-red-50 rounded focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => history.goBack()}
                        >
                            Назад
                        </button>
                        <button
                            className="bg-sky-500 text-white active:bg-sky-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                            disabled={!formik.isValid}
                        >
                            Сохранить изменения
                        </button>
                    </div>
                </form>
            </FormikProvider>
        </div>
    )
}

export default EditExpensesPage