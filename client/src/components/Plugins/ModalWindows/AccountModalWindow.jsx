import React from "react";
import TextField from "../../common/form/textField";
import {FormikProvider, useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch} from 'react-redux'
import {createAccount} from "../../../store/accounts";
import {createOperation} from "../../../store/operationsHistory";
import Button from "../../common/Button";
import closeIcon from "./closeIcon.svg";

const validationSchema = Yup.object().shape({
    accountName: Yup.string()
        .required('Данное поле обязательно для заполнения'),
    sum: Yup.number()
        .required('Данное поле обязательно для заполнения')
        .typeError('Сумма зачисления должна быть числом')
})

const initialValues = {
    accountName: '',
    sum: ''
}

const AccountModalWindow = ({onCLick}) => {
    const dispatch = useDispatch()
    const handleSubmit = (formValue) => {
        dispatch(createAccount(formValue))

        const operation = {
            type: 'ACCOUNT',
            action: 'ADD',
            sum: formValue.sum,
            accountName: formValue.accountName
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
                className="justify-center items-center flex overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto min-w-[355px] min-h-[410px]">
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div
                            className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Добавить счет
                            </h3>
                            <img
                                src={closeIcon}
                                className='absolute top-4 right-4 w-8 cursor-pointer shadow-2xl'
                                onClick={onCLick}
                                alt='plus'
                            />
                        </div>
                        <div className="relative px-6 py-1 flex-auto">
                            <FormikProvider value={formik}>
                                <form onSubmit={formik.handleSubmit}>
                                    <TextField
                                        label='Название счета:'
                                        name='accountName'
                                        placeholder='Кредитная карта АльфаБанк'
                                        value={formik.values.accountName}
                                    />
                                    <TextField
                                        label='Начальная сумма на счету:'
                                        name='sum'
                                        placeholder='4000000'
                                        value={formik.values.sum}
                                    />
                                    <div className='flex justify-end mb-3'>
                                        <Button
                                            face='primary'
                                            type="submit"
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
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default AccountModalWindow