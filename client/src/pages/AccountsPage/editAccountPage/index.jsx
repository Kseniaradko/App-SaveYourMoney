import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import * as Yup from "yup";
import history from "../../../utils/history";
import {FormikProvider, useFormik} from "formik";
import TextField from "../../../components/common/form/textField";
import {getCurrentAccount, updateAccount} from "../../../store/accounts";
import Loader from "../../../components/common/Loader";
import {toast} from "react-toastify";

const validationSchema = Yup.object().shape({
    accountName: Yup.string().required('Данное поле обязательно для заполнения'),
    sum: Yup.number()
        .required('Данное поле обязательно для заполнения')
        .typeError('Сумма зачисления должна быть числом')
})

const EditAccountPage = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const {accountId} = params
    const account = useSelector(getCurrentAccount(accountId))

    const initialValues = {
        accountName: account.accountName,
        sum: account.sum
    }

    const handleSubmit = (formValue) => {
        dispatch(updateAccount(accountId, formValue))
        toast.success('Счет был изменен!', {
            position: toast.POSITION.TOP_RIGHT
        })
        history.goBack()
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: true,
        onSubmit: handleSubmit
    })
    if (!account) return <Loader/>

    return (
        <div
            className='max-w-screen-xl m-auto w-full flex flex-col items-center rounded-lg overflow-hidden w-96 ring-1 ring-slate-900/5 shadow-xl p-6 '>
            <div className='text-center text-slate-500 text-2xl underline underline-offset-8 py-4'>
                Редактирование счета
            </div>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label='Название счета:'
                        name='accountName'
                        value={formik.values.accountName}
                        placeholder='Заработная плата'
                    />
                    <TextField
                        label='Сумма зачисления:'
                        name='sum'
                        value={formik.values.sum}
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

export default EditAccountPage