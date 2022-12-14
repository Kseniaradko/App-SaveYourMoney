import React from "react";
import TextField from "../../common/form/textField";
import {FormikProvider, useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {getAccounts} from "../../../store/accounts";
import SelectField from "../../common/form/selectField";
import {createIncome} from "../../../store/incomes";
import {toast} from "react-toastify";
import {createOperation} from "../../../store/operationsHistory";

const validationSchema = Yup.object().shape({
    category: Yup.string()
        .required('Данное поле обязательно для заполнения'),
    accountId: Yup.string()
        .required('Данное поле обязательно для заполнения'),
    sum: Yup.number()
        .required('Данное поле обязательно для заполнения')
        .typeError('Сумма зачисления должна быть числом')
})

const initialValues = {
    category: '',
    accountId: '',
    sum: ''
}

const IncomeModalWindow = ({onCLick}) => {
    const dispatch = useDispatch()
    const accounts = useSelector(getAccounts())

    const handleSubmit = (formValue) => {
        dispatch(createIncome(formValue))

        const accountLabel = accounts.filter((acc) => acc.accountId === formValue.accountId)[0].accountName
        const operation = {
            type: 'INCOME',
            action: 'ADD',
            category: formValue.category,
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
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div
                            className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Добавить доход
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => onCLick}
                            >
                                            <span
                                                className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                            </button>
                        </div>
                        <div className="relative px-6 py-3 flex-auto">
                            <FormikProvider value={formik}>
                                <form onSubmit={formik.handleSubmit}>
                                    <TextField
                                        label='Категория:'
                                        name='category'
                                        placeholder='Заработная плата'
                                        value={formik.values.category}
                                    />
                                    <SelectField
                                        label='Выберите счет зачисления денежных средств:'
                                        name='accountId'
                                        defaultOption='Choose...'
                                        options={accounts}
                                        value={formik.values.accountId}
                                    />
                                    <TextField
                                        label='Сумма зачисления:'
                                        name='sum'
                                        placeholder='30000'
                                        value={formik.values.sum}
                                    />
                                    <div className='flex justify-end mt-4'>
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-3 text-sm outline-none hover:bg-red-50 rounded focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => onCLick()}
                                        >
                                            Закрыть
                                        </button>
                                        <button
                                            className="bg-sky-500 text-white active:bg-sky-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
                                            type="submit"
                                            disabled={!formik.isValid}
                                        >
                                            Сохранить
                                        </button>
                                    </div>
                                </form>
                            </FormikProvider>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default IncomeModalWindow