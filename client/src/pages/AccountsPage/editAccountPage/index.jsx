import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import * as Yup from "yup";
import history from "../../../utils/history";
import {FormikProvider, useFormik} from "formik";
import TextField from "../../../components/common/form/textField";
import {getCurrentAccount, updateAccount} from "../../../store/accounts";
import Loader from "../../../components/common/Loader";
import {createOperation} from "../../../store/operationsHistory";
import Button from "../../../components/common/Button";

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
        const operation = {
            type: 'ACCOUNT',
            action: 'EDIT',
            sum: formValue.sum,
            accountName: formValue.accountName
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
    if (!account) return <Loader/>

    return (
        <div
            className='max-w-screen-xl m-auto flex flex-col items-center rounded-lg min-w-[350px] ring-1 ring-slate-900/5 shadow-xl p-6 '
        >
            <div className='text-center text-slate-500 text-2xl underline underline-offset-8 py-4'>
                Редактирование счета
            </div>
            <div
                className='min-w-[300px]'
            >
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
                        <div className='flex mt-4 gap-2'>
                            <Button
                                face='secondary'
                                type="button"
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
        </div>
    )
}

export default EditAccountPage